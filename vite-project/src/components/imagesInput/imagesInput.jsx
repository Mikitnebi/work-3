import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaCloudUploadAlt } from "react-icons/fa";
import './images.css'
export default function ImagesInput({setStep, prevStep, nextStep }) {
  const [imagePreviews, setImagePreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });

  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    // Ensure all images are provided
    const allImagesProvided =
      imagePreviews.image1 &&
      imagePreviews.image2 &&
      imagePreviews.image3 &&
      imagePreviews.image4 &&
      imagePreviews.image5;

    if (allImagesProvided) {
      nextStep();
    } else {
      alert("Please provide all five images.");
    }
  };

  const onDrop = (acceptedFiles, fieldName) => {
    // Filter out files that are not PNG or JPEG
    const imageFiles = acceptedFiles.filter(
      (file) => file.type === "image/jpeg" || file.type === "image/png"
    );

    if (imageFiles.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreviews((prevState) => ({
          ...prevState,
          [fieldName]: e.target.result,
        }));
      };
      reader.readAsDataURL(imageFiles[0]);
    } else {
      alert("Please upload only PNG or JPEG files.");
    }
  };

  const renderDropzone = (fieldName) => {
    const { getRootProps, getInputProps } = useDropzone({
      accept: "image/jpeg, image/png",
      onDrop: (acceptedFiles) => onDrop(acceptedFiles, fieldName),
    });

    return (
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <ion-icon size={'large'} name="cloud-upload-outline"></ion-icon> 
        <p>ჩააგდე ფოტო ან დააკლიკე და ხელით ატვირთე ის</p>
        {imagePreviews[fieldName] && (
          <div className="image-preview">
            <img src={imagePreviews[fieldName]} alt={`Preview `} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="first-box-image" >
      {/* <img className="imagesComponentImage" src="../../../public/asddasda.png" alt="" /> */}

<div className="first-box-brother-image" >
<div className='firstStep-Name'>
    <img style={{width:'4%',marginRight:'5px'}} src="../../../public/img/Group4.png" alt="Main Logo" />
    <h3 >მოგესალმებით მიკიტანში</h3>

    <div className="details-steps">
      <div onClick={()=>setStep(1)}>
      <ion-icon name="newspaper-outline"></ion-icon>
      <h3 style={{color:'#8C1D2F'}}>1. დეტალები</h3>

      </div>
      <div style={{borderColor:'#8C1D2F',borderWidth:'1.5px'}} className="details-line">

      </div>
      <div  onClick={()=>setStep(2)}>
      <ion-icon name="images-outline"></ion-icon>
      <h3  style={{color:'#8C1D2F'}}>2. სურათები</h3>

      </div>
      <div className="details-line">

      </div>
      <div  onClick={()=>setStep(3)}>
      <ion-icon name="grid-outline"></ion-icon>
      <h3>3. მაგიდები</h3>

      </div>
      <div className="details-line">
        
        </div>
        <div  onClick={()=>setStep(4)}>
          <ion-icon name="fast-food-outline"></ion-icon>
          <h3>4. მენიუ</h3>

        </div>
        <div className="details-line">
          
        </div>
        <div  onClick={()=>setStep(5)}>
          <ion-icon name="flag-outline"></ion-icon>
          <h3>5. დასასრული</h3>

        </div >
 
    </div>
        </div>
        <div style={{height:'10%'}} className='footerImages'>
  <h3 >powered by MIKITANI</h3>
  <h3>2024</h3>
  
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="formImages" id="form">
        <div className="FirstPartImages">
        <div className="form-controlImages">
          <span style={{fontFamily: 'YourCustomFont, sans-serif',fontSize:'13px',color:'#8C1D2F'}}>მთავარი სურათი</span>
          {renderDropzone("image1")}

        </div>
        <div className="form-controlImages">
          {renderDropzone("image2")}

        </div>
        <div className="form-controlImages">
          {renderDropzone("image3")}

        </div>
        </div>
        <div className="SecondPartImages">
        <div className="form-controlImages">
          {renderDropzone("image4")}

        </div>
        <div className="form-controlImages">
          {renderDropzone("image5")}

        </div>
        </div>
      
        <div style={{display:'flex', width:'100%', justifyContent:'space-between',alignItems:'center',marginTop:'0%',marginBottom:'1%'}}>
        <button onClick={prevStep} className="imageButtonSubmit" >უკან</button>

        <button className="imageButtonSubmit" type="submit">შემდეგი</button>

        </div>
      </form>
</div>
    
  
    </div>
  );
}
