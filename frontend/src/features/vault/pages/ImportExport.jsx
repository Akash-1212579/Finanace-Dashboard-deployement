import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StepProgress } from "./StepProgress";
import { UploadInfoSteps } from "./UploadInfoSteps";
import { useState } from "react";
import axios from "axios";
import api from "../../transactions/pages/axiosInstance";
import CsvContainer from "./CsvFileContainer";
export default function ImportExport() {
  const[file,setFile] = useState(null);
  const[progressNum,setProgress] = useState(1);
  function handleFile(e)
  {
     const selectedFile = e.target.files[0];

  if (!selectedFile) return;

  setFile(selectedFile);
  setProgress(prev=>prev+1);
  // console.log(selectedFile.type);
  }

  async function handleFileUpload()
  { console.log("file is",file);
     if(!file)
    {
      return alert("Please select file first")
    }

    else if(file.type=="text/csv")
    {
        setProgress(prev=>prev+1);
        const formData = new FormData();
        formData.append("file",file);


        try {
          /// herree is backend end point
          // await axios.post("https://httpbin.org/post",formData)
          await api.post("uploadcsv/upload",formData);
          console.log(formData)
          setProgress(prev=>prev+1);
          setFile(null);
          console.log("File Uploaded")
        } catch (error) {
          console.log(error.message);
        }

    }
    
    else
      return alert("Please select csv format file");
  }
  return (
    // <div className="space-y-4 max-w-sm">
    //   <Input
    //     type="file"
    //     accept=".csv"
    //     onChange={(e) => setFile(e.target.files?.[0] || null)}
    //   />
    //   <Button disabled={loading} onClick={uploadCSV}>
    //     {loading ? "Uploading..." : "Upload CSV"}
    //   </Button>
    // </div>
    <>
      <div className="w-full h-full flex  flex-col bg-white-500">
        <div className=" h-20 flex justify-start items-center px-5">
          <StepProgress currentStep={progressNum} />
          {/* i have to pass current step each time */}
        </div>
        {/* this will be the div for upload csv */}

        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className=" m-10 flex flex-col items-center justify-center w-full h-64 bg-neutral-100
 border-3 border-dashed border-default-strong rounded-base cursor-pointer hover:bg-neutral-200  hover:-translate-y-[5px] transition-transform duration-300 ease-out
"
          >
            <div className="flex flex-col items-center justify-center text-body pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h3a3 3 0 0 0 0-6h-.025a5.56 5.56 0 0 0 .025-.5A5.5 5.5 0 0 0 7.207 9.021C7.137 9.017 7.071 9 7 9a4 4 0 1 0 0 8h2.167M12 19v-9m0 0-2 2m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs">Upload Bank Statement (CSV ONLY)</p>
            </div>
            {/* <input  type="file" className="hidden" onChange={handleFile}/> */}
          <label className="cursor-pointer">
  Upload file
  <input
    type="file"
    className="hidden"
    onChange={handleFile}
  />
</label>
          </label>
        </div>
        {/* <UploadInfoSteps/> */}

        <div className="flex items-center justify-center">
          <Button onClick={handleFileUpload} className="inline-flex w-35 items-center justify-center px-4 py-2 rounded-md text-sm font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2">
            Upload
          </Button>
        </div>
        <CsvContainer/>
      </div>
    </>
  );
}
