import { useRef, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

function CareersForm() {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState({});
  const fullName = useRef();
  const designation = useRef();
  const yearsOfExperience = useRef();
  const [message, setMessage] = useState(false);
  const handleCareer = async (e) => {
    let errors = {};
    let arr = fullName.current.value.split(" ");
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "") continue;
      counter++;
    }
    if (counter < 3) {
      errors.fullNameErr = "please provide your full name";
    }

    if (yearsOfExperience.current.value === "") {
      errors.yearsOfExperienceErr = "please enter a valid number of years";
    }
    if (files.length === 0) {
      errors.filesErr = "please upload resume and/or resume image";
    }
    setError(errors);
    if (JSON.stringify(errors) === "{}") {
      const career = {
        fullName: fullName.current.value,
        designation: designation.current.value,
        yearsOfExperience: yearsOfExperience.current.value,
        submitDate: new Date(),
      };
      const data = new FormData();
      const pdf = `${Date.now()}${files[0]?.name}`;
      const image = `${Date.now()}${files[1]?.name}`;

      for (let x = 0; x < files.length; x++) {
        data.append("files", files[x]);
      }

      career.resume = pdf;
      career.resumeImage = image;
      await fetch("https://emp-dashboard-client.vercel.app/upload", {
        method: "POST",
        body: data,
      });

      await fetch("https://emp-dashboard-client.vercel.app/apply-career", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(career),
      }).then(() => {
        setTimeout(() => {
          setMessage(true);
        }, 0);
      });
    }
  };

  return (
    <div className="formContainer" style={{ width: message ? "100%" : "50%" }}>
      {message ? (
        <p className="message">
          Thanks for applying, we will contact you as soon as possible
        </p>
      ) : (
        <form className="form">
          <div className="row">
            <label>Full name</label>
            <input type="text" ref={fullName} />
          </div>
          <p className="error">{error.fullNameErr}</p>

          <div className="row">
            <label>Designation</label>
            <select ref={designation}>
              <option>Project Manager</option>
              <option>Analyst</option>
              <option>Full-stack developer</option>
              <option>Back-end developer</option>
              <option>Front-end developer</option>
              <option>UX designer/Graphic designer</option>
              <option>The (quality) tester</option>
            </select>
          </div>

          <div className="row">
            <label>Years of experience</label>
            <input type="number" ref={yearsOfExperience} />
          </div>
          <p className="error">{error.yearsOfExperienceErr}</p>

          <div className="row">
            <label htmlFor="resumeFile" className="downloadImg">
              <AddAPhotoIcon className="postIcon" />
              <span>Upload resume</span>
            </label>

            <input
              type="file"
              accept=".png,.jpeg,.jpg"
              id="resumeFile"
              name="file"
              className="upload"
              onChange={(e) => setFiles([...files, e.target.files[0]])}
            ></input>
          </div>

          <div className="row">
            <label htmlFor="resumeImage" className="downloadImg">
              <AddAPhotoIcon className="postIcon" />
              <span>Upload resume image</span>
            </label>

            <input
              type="file"
              accept="application/pdf,application/msword"
              id="resumeImage"
              className="upload"
              onChange={(e) => setFiles([...files, e.target.files[0]])}
              name="image"
            ></input>
          </div>
          <p className="error">{error.filesErr}</p>

          <div className="row">
            <button type="button" className="btn" onClick={handleCareer}>
              Request
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default CareersForm;
