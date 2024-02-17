import "./images.css";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";


export default function ImagesInput ({prevStep,nextStep}) {

  const [imagePreviews, setImagePreviews] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });

    const schema = yup.object().shape({
        image1: yup
          .mixed()
          .required("Image 1 is required")
          .test("fileType", "Only image files are allowed", (value) => {
            if (!value || !value[0]) return false; // Field is required, so return false if empty
            return (
              ["image/jpeg", "image/png", "image/gif"].includes(value[0].type) &&
              value[0].size <= 10485760 // Max 10MB
            );
          }),
        image2: yup
          .mixed()
          .required("Image 2 is required")
          .test("fileType", "Only image files are allowed", (value) => {
            if (!value || !value[0]) return false; // Field is required, so return false if empty
            return (
              ["image/jpeg", "image/png", "image/gif"].includes(value[0].type) &&
              value[0].size <= 10485760 // Max 10MB
            );
          }),
        image3: yup
          .mixed()
          .required("Image 3 is required")
          .test("fileType", "Only image files are allowed", (value) => {
            if (!value || !value[0]) return false; // Field is required, so return false if empty
            return (
              ["image/jpeg", "image/png", "image/gif"].includes(value[0].type) &&
              value[0].size <= 10485760 // Max 10MB
            );
          }),
          image4: yup
          .mixed()
          .required("Image 4 is required")
          .test("fileType", "Only image files are allowed", (value) => {
            if (!value || !value[0]) return false; // Field is required, so return false if empty
            return (
              ["image/jpeg", "image/png", "image/gif"].includes(value[0].type) &&
              value[0].size <= 10485760 // Max 10MB
            );
          }),
          image5: yup
          .mixed()
          .required("Image 5 is required")
          .test("fileType", "Only image files are allowed", (value) => {
            if (!value || !value[0]) return false; // Field is required, so return false if empty
            return (
              ["image/jpeg", "image/png", "image/gif"].includes(value[0].type) &&
              value[0].size <= 10485760 // Max 10MB
            );
          }),
      });

      const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
      })

      const onSubmit = (data) => {
        nextStep()
      }
      const handleImageChange = (event, fieldName) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setImagePreviews((prevState) => ({
              ...prevState,
              [fieldName]: e.target.result,
            }));
          };
          reader.readAsDataURL(file);
        }
      };
    return (


        <div style={{top:'10%'}} className="first-box">

        
        <form style={{marginTop:'0px'}} onSubmit={handleSubmit(onSubmit)} action="" className="form" id="form">
        <div style={{left:'20%'}} className="menu-flex1">
        <button style={{width:'40%'}} className="last-step-button1" onClick={(e) => prevStep()}>
          Back
        </button>
        <button style={{width:'40%'}} className="final-save-button1" type="submit">
          Next
        </button>
        </div>
        <div style={{fontSize:'20px',marginBottom:'20px',color:'navy'}}>Restaurant's main pictures</div>

             <div className="form-control-first">
          <label htmlFor="image1">Image 1</label>
          <input
            type="file"
            id="image1"
            accept=".jpg, .jpeg, .png, .gif"
            {...register("image1", { validate: value => value[0] !== undefined })}
            onChange={(e) => handleImageChange(e, 1)}

          />
           {imagePreviews[1] && (
              <div className="image-preview">
                <img src={imagePreviews[1]} alt={`Preview `} />
              </div>
            )}
          <small>{errors.image1?.message}</small>
        </div>
        <div className="form-control-first">
          <label htmlFor="image2">Image 2</label>
          <input
            type="file"
            id="image2"
            accept=".jpg, .jpeg, .png, .gif"
            {...register("image2", { validate: value => value[0] !== undefined })}
            onChange={(e) => handleImageChange(e, 2)}

          />
          {imagePreviews[2] && (
              <div className="image-preview">
                <img src={imagePreviews[2]} alt={`Preview `} />
              </div>
            )}
          <small>{errors.image2?.message}</small>
        </div>
        <div className="form-control-first">
          <label htmlFor="image3">Image 3</label>
          <input
            type="file"
            id="image3"
            accept=".jpg, .jpeg, .png, .gif"
            {...register("image3", { validate: value => value[0] !== undefined })}
            onChange={(e) => handleImageChange(e, 3)}

          />
          {imagePreviews[3] && (
              <div className="image-preview">
                <img src={imagePreviews[3]} alt={`Preview `} />
              </div>
            )}
          <small>{errors.image3?.message}</small>
        </div>
        <div className="form-control-first">
          <label htmlFor="image4">Image 4</label>
          <input
            type="file"
            id="image4"
            accept=".jpg, .jpeg, .png, .gif"
            {...register("image4", { validate: value => value[0] !== undefined })}
            onChange={(e) => handleImageChange(e, 4)}

          />
          {imagePreviews[4] && (
              <div className="image-preview">
                <img src={imagePreviews[4]} alt={`Preview `} />
              </div>
            )}
          <small>{errors.image4?.message}</small>
        </div>
        <div className="form-control-first">
          <label htmlFor="image5">Image 5</label>
          <input
            type="file"
            id="image5"
            accept=".jpg, .jpeg, .png, .gif"
            {...register("image5", { validate: value => value[0] !== undefined })}
            onChange={(e) => handleImageChange(e, 5)}

          />
          {imagePreviews[5] && (
              <div className="image-preview">
                <img src={imagePreviews[5]} alt={`Preview `} />
              </div>
            )}
          <small>{errors.image5?.message}</small>
        </div>

         <button className="first-step-button" type="submit">
          Next
        </button>
        </form>


        </div>
    )
}