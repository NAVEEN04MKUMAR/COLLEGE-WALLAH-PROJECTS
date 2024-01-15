import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";




import Homelayout from "../../layout/Homelayout";
import { createnewcourses } from "../../redux/slices/courseslice";



function Createcourse() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const [userinput, setuserinput] = useState({
        title: "",
        description: "",
        category: "",
        createdBy: "",
        thumbnail: null, 
        previewimage: ""
    });


  function handleimageupload(e) {
        e.preventDefault();
        const uploadedImage = e.target.files[0];
        if(uploadedImage) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function() {
                setuserinput({
                    ...userinput,
                    thumbnail: uploadedImage,
                    previewimage: this.result
                });
            });
        }
    }
   function handleuserinput(e) {
        const { name, value } = e.target;
        setuserinput({
            ...userinput,
            [name]: value
        });
    }

    async function onformsubmit(e) {
        e.preventDefault();
        if(!userinput.title || !userinput.description || !userinput.createdBy || !userinput.category || !userinput.thumbnail) {
            toast.error("All field are mandatory");
            return;
        }

        const response = await dispatch(createnewcourses(userinput));
        console.log(response);
        if(response?.payload?.success) {
            setuserinput({
                title: "",
                description: "",
                category: "",
                createdBy: "",
                thumbnail: null,
                previewimage: ""
            });
            navigate("/courses");
        }
    }


    return (
        <Homelayout>
            <div className="h-[100vh] flex itmes-center justify-center">

                <form
                    onSubmit={onformsubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white h-[500px] w-[700px] my-10 shadow-[0_0_10px_black] relative"
                >   
                    <Link onClick={() => navigate(-1)} className="absolute top-8 text-2xl link text-accent cursor-pointer">
                        <AiOutlineArrowLeft />
                    </Link>
                    <h1 className="text-center text-2xl font-bold">
                        Create new course
                    </h1>

                    <main className="grid grid-cols-2 gap-x-10">
                        {/* left */}
                        <div className="gap-y-6">
                            <div>
                                <label htmlFor="image_uploads" className="cursor-pointer">
                                    {userinput?.previewimage ? (
                                        <img 
                                            src={userinput?.previewimage}
                                            className="w-full h-44 m-auto border"
                                        />
                                    ): (
                                        <div className="w-full h-44 m-auto flex items-center justify-center border">
                                            <h1 className="font-bold text-lg">Upload course thumbnail</h1>
                                        </div>
                                    )}
                                </label>
                                <input 
                                    className="hidden"
                                    type="file"
                                    id="image_uploads"
                                    accept=".jpg, .png, .jpeg, .svg"
                                    name="image_uploads"
                                    onChange={handleimageupload}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="title" className="text-lg font-semibold">Course title</label>
                                <input 
                                    required
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="enter the title of the course"
                                    onChange={handleuserinput}
                                    value={userinput.title}
                                    className="bg-transparent px-2 py-1 border"
                                
                                />
                            </div>
                        </div>

 <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap1">
                                <label htmlFor="createdby" className="text-lg font-semibold">Instructor</label>
                                <input 
                                    required
                                    type="text"
                                    name="createdby"
                                    id="createdby"
                                    placeholder="enter the instructor of the course"
                                    onChange={handleuserinput}
                                    value={userinput.createdby}
                                    className="bg-transparent px-2 py-1 border"
                                
                                />

                            </div>

                            <div className="flex flex-col gap1">
                                <label htmlFor="category" className="text-lg font-semibold">Category</label>
                                <input 
                                    required
                                    type="text"
                                    name="category"
                                    id="category"
                                    placeholder="enter the category of the course"
                                    onChange={handleuserinput}
                                    value={userinput.category}
                                    className="bg-transparent px-2 py-1 border"
                                
                                />

                            </div>

                            <div className="flex flex-col gap1">
                                <label htmlFor="description" className="text-lg font-semibold">Description</label>
                                <textarea 
                                    required
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder="enter the description of the course"
                                    onChange={handleuserinput}
                                    value={userinput.description}
                                    className="bg-transparent px-2 py-1 border h-24 resize-none overflow-y-scroll"
                                
                                />
                            </div>

                        </div>





          </main>
                    <button
                        type="submit"
                        className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300"
                    >
                        Create Course
                    </button>
                </form>
            </div>
        </Homelayout>
    );
}

export default Createcourse;