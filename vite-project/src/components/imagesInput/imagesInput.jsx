import "./images.css";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";


export default function ImagesInput ({prevStep,nextStep}) {

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
      }

    return (
        <div style={{top:'10%'}} className="first-box">

        <div className="menu-flex">
        <button className="last-step-button1" onClick={(e) => prevStep()}>
          Back
        </button>
        <button className="final-save-button1" onClick={(e) => nextStep()}>
          Next
        </button>
        </div>
        <form style={{marginTop:'40px'}} onSubmit={handleSubmit(onSubmit)} action="" className="form" id="form">

             <div className="form-control-first">
          <label htmlFor="image1">Image 1</label>
          <input
            type="file"
            id="image1"
            accept=".jpg, .jpeg, .png, .gif"
            {...register("image1", { validate: value => value[0] !== undefined })}
          />
          <small>{errors.image1?.message}</small>
        </div>
        <div className="form-control-first">
          <label htmlFor="image2">Image 2</label>
          <input
            type="file"
            id="image2"
            accept=".jpg, .jpeg, .png, .gif"
            {...register("image2", { validate: value => value[0] !== undefined })}
          />
          <small>{errors.image2?.message}</small>
        </div>
        <div className="form-control-first">
          <label htmlFor="image3">Image 3</label>
          <input
            type="file"
            id="image3"
            accept=".jpg, .jpeg, .png, .gif"
            {...register("image3", { validate: value => value[0] !== undefined })}
          />
          <small>{errors.image3?.message}</small>
        </div>
        <div className="form-control-first">
          <label htmlFor="image3">Image 3</label>
          <input
            type="file"
            id="image3"
            accept=".jpg, .jpeg, .png, .gif"
            {...register("image4", { validate: value => value[0] !== undefined })}
          />
          <small>{errors.image3?.message}</small>
        </div>
        <div className="form-control-first">
          <label htmlFor="image3">Image 3</label>
          <input
            type="file"
            id="image3"
            accept=".jpg, .jpeg, .png, .gif"
            {...register("image5", { validate: value => value[0] !== undefined })}
          />
          <small>{errors.image3?.message}</small>
        </div>

         <button className="first-step-button" type="submit">
          Next
        </button>
        </form>


        </div>
    )
}