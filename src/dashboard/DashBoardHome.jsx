import React, { useState } from "react";
import useAppStore from "../store/useAppStore";
import vector from "../assets/Vector.png";
import bag from "../assets/Dashboard/bag.png";
import draft from "../assets/Dashboard/draft.png";
import question from "../assets/Dashboard/question.png";
import case_img from "../assets/Dashboard/case.png";
import { ArrowBigDown, ArrowDown, ChevronRight, Send } from "lucide-react";
import { FileUp, X } from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
import chat from "../assets/Dashboard/chat.png";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const DashBoardHome = () => {
  const { user, saveNote, sendFile, clientFile } = useAppStore();
  // For single file upload, we still keep an array but it will contain at most one file.
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileDescription, setFileDescription] = useState(""); // New state for file description

  const [noteData, setNoteData] = useState({
    NoteTitle: "",
    NoteContent: "",
  });
  const [forClient, setForClient] = useState(false);

  const handleFileUpload = (e) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "text/plain",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const file = e.target.files[0]; // Only allow a single file
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      alert("Only PDF, JPG, PNG, TXT, and Word files are allowed.");
      return;
    }
    
    // Directly set the file (replace any existing file)
    setUploadedFiles([file]);
  };

  const removeFile = (fileName) => {
    setUploadedFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== fileName)
    );
    // Clear the description when file is removed
    setFileDescription("");
  };

  const handleEditorChange = (e) => {
    setNoteData({
      ...noteData,
      NoteContent: e.target.value, // Capture editor content
    });
    console.log("content", e.target.value);
  };
  const handleTitleChange = (e) => {
    setNoteData({
      ...noteData,
      NoteTitle: e.target.value, // Update NoteTitle when typing
    });
    console.log("title", e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const plainTextContent =
      new DOMParser().parseFromString(noteData.NoteContent, "text/html").body
        .textContent || "";
    const credential = {
      userId: user._id,
      title: noteData.NoteTitle,
      content: noteData.NoteContent,
    };
    saveNote(credential);
    setNoteData({
      NoteTitle: "",
      NoteContent: "",
    });
  };

  const handleUpload = async () => {
    if (uploadedFiles.length === 0) {
      console.error("No file selected.");
      return;
    }

    // Create a user credential object to send the single file with description
    const credential = {
      file: uploadedFiles[0], // Only the single file
      description: fileDescription, // Attached description for the file
      userId: user._id,
      forClient,
    };

    // Credential for client account
    const clientCredential = {
      file: uploadedFiles[0],
      description: fileDescription,
      userId: user._id,
    };

    if (user.userType === "client") {
      clientFile(clientCredential);
    } else {
      sendFile(credential);
    }
  };

  return (
    <>
      <div className="flex gap-6 h-auto">

        <div className="flex-1 p-2">
          <div className="space-y-6 flex flex-col justify-between h-full">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/10 rounded-full">
                <img src={vector} alt="" />
              </div>
              <h2 className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-transparent font-bold text-3xl">
                AI For Document Review
              </h2>
            </div>

            <p className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-transparent text-xl">
              Which legal Task can AI accelerate for you today?
            </p>

            {/* Grid Container */}
            <div className="grid grid-cols-2 gap-6 h-full">
              {[
                { title: "Ask a Question?", icon: bag, to: "ai" },
                { title: "Create a draft", icon: draft },
                {
                  title: "Summarize a case",
                  icon: case_img,
                  to: "summarizedocument",
                },
                {
                  title: "Chat with client.",
                  icon: chat,
                  to: "client",
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  className="flex items-center justify-center h-64 gap-4 border-2 border-white/20 border-dotted p-6 rounded-2xl hover:border-white/80 transition-colors"
                  to={`/dashboard/${user.name}/chat/${item.to}`}
                >
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-12 h-12 text-white"
                  />{" "}

                  <p className="bg-gradient-to-b from-[#F6F6F7] to-[#7E808F] bg-clip-text text-transparent font-medium">
                    {item.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="w-[28rem] h-full justify-center my-auto bottom-0">
          <form
            className="bg-[#1A114A] p-4 rounded-2xl h-full"
            onSubmit={handleSubmit}
          >
            <h3 className="text-white font-bold text-lg font-beVietnam mb-4">
              Add Notes
            </h3>

            <div className="mb-[2rem]">
              <h3 className="text-white  font-beVietnam mb-4">
                <input
                  type="text"
                  placeholder="Note Title"
                  name="NoteTitle"
                  value={noteData.NoteTitle}
                  onChange={handleTitleChange}
                  className="bg-inherit w-full border border-white/40 p-2 text-sm text-white rounded-md focus:outline-none"
                />
              </h3>
              <textarea
                type="text"
                placeholder="Type your note here..."
                onChange={handleEditorChange}
                className="w-full h-[40vh] bg-inherit border border-violet-500/40 rounded-md text-start focus:outline-none p-2"
              />
            </div>
            <div className="flex  font-beVietnam mt-[1rem] gap-4 w-full">
              <button className="bg-green-500 font-[500] text-white rounded-[1.5rem] w-full p-4 border border-white/60">
                Save Note
              </button>
              {/* <button className="bg-[#060b27] font-[500] text-white rounded-[1.5rem] p-4 border border-white/90">
                Edit Note
              </button>
              <button className="bg-red-700 font-[500] text-white rounded-[1.5rem] p-4">
                Delete Note
              </button> */}
            </div>
          </form>
        </div>
      </div>

      {user.userType !== "client" && (
        <div className="flex items-center space-x-3">
          <span className="text-white text-md">For Client:</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={forClient}
              onChange={() => setForClient((prev) => !prev)}
            />
            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-5"></div>
          </label>
        </div>
      )}

      <div className="flex space-x-5">
        <div className="bg-[#0B213F] p-3 rounded-[1rem] flex justify-center items-center gap-2 border-dashed border-white border-2 space-y-5 h-[26rem] w-full cursor-pointer">
          <label className="w-full h-full">
            <input
              type="file"
              className="hidden"
              onChange={handleFileUpload}
            />
            <div className="bg-[#060B27] w-full flex justify-center items-center flex-col gap-2 rounded-[1rem] h-full">
              <FileUp size={70} />
              <div className="text-lg font-[500] font-beVietnam">
                Drag and Drop a file
              </div>
            </div>
          </label>

          {/* File Preview Section */}
          {uploadedFiles.length > 0 && (
            <div className="bg-[#0B213F] p-4 flex flex-col justify-between h-full rounded-[1rem] w-[40%] max-h-[400px] relative">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="relative bg-[#060B27] p-2 rounded-[10px] flex flex-col gap-2 justify-between px-[1rem] py-[10px]"
                >
                  <button
                    onClick={() => removeFile(file.name)}
                    className="absolute top-2 right-2"
                  >
                    <X size={20} className="text-white cursor-pointer" />
                  </button>
                  <div className="flex items-center space-x-3">
                    <FileUp size={24} />
                    <div className="flex flex-col gap-1">
                      <p className="text-white text-sm">{file.name}</p>
                      <p className="text-gray-400 text-[12px]">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 mt-2">
                    <textarea
                      placeholder="Enter description for this file"
                      value={fileDescription}
                      onChange={(e) => setFileDescription(e.target.value)}
                      className="w-full h-24 bg-inherit border border-white/40 p-2 text-sm text-white rounded-md focus:outline-none"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={handleUpload}
                className="p-2 mt-2 border border-white text-white bg-[#060B27] border-opacity-40 rounded-md"
              >
                Upload
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="h-auto bg-black flex justify-between items-center p-4 border gap-2 border-white/20 mt-[1rem] rounded-md">
        <div className="w-[60%]">
          <p className="text-lg text-white/60">Ask a question</p>
        </div>
        <div className="flex items-center justify-between gap-2 w-[40%]">
          <div className="flex items-center justify-center gap-2 px-[2rem] py-[1rem] bg-[#1A114A] p-4 rounded-[1rem]">
            Select a jurisdiction
            <p>
              <ArrowDown className="w-5 h-5" />
            </p>
          </div>

          <div>
            <Send className="w-5 h-5 text-white/60" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardHome;



{
  /* <Editor
                onEditorChange={handleEditorChange}
                apiKey="anpfmeb7fv27df7te7i43st6vp48mar7eu77wisqeiww3gz9"
                init={{
                  plugins: [
                    // Core editing features
                    "anchor",
                    "autolink",
                    "charmap",
                    "codesample",
                    "emoticons",
                    "image",
                    "link",
                    "lists",
                    "media",
                    "searchreplace",
                    // "table",
                    "visualblocks",
                    "wordcount",
                    // Your account includes a free trial of TinyMCE premium features
                    // Try the most popular premium features until Feb 28, 2025:
                    // "checklist",
                    // "mediaembed",
                    // "casechange",
                    // // "export",
                    // "formatpainter",
                    // "pageembed",
                    // "a11ychecker",
                    // "tinymcespellchecker",
                    // "permanentpen",
                    // "powerpaste",
                    // "advtable",
                    // "advcode",
                    // "editimage",
                    // "advtemplate",

                    // "mentions",
                    // "tinycomments",
                    // "tableofcontents",
                    // "footnotes",
                    // "mergetags",
                    // "autocorrect",
                    // "typography",
                    // "inlinecss",
                    // "markdown",
                    // "importword",
                    // "exportword",
                    // "exportpdf",
                  ],
                  toolbar:
                    "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                  mergetags_list: [
                    { value: "First.Name", title: "First Name" },
                    { value: "Email", title: "Email" },
                  ],
                }}
                initialValue="Welcome to DATACOVE!"
              /> */
}
