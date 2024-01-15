import Homelayout from "../layout/Homelayout";
import apj from "../assets/images/apj.png";
import billGates from "../assets/images/billGates.png";
import einstein from "../assets/images/einstein.png";
import steveJobs from "../assets/images/steveJobs.png";





function Aboutus(){
    return (
        <Homelayout>
            <div calssName="flex flex-col text white pl-20 pt-20">
                <div calssName="flex-items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                        <h1 className="text-5xl text-yellow-500 font-semibold">
                           Afordable and quality education
                        </h1>
<p className="text-xl text-gray-200">
Our goal is to provide the affordable and quality education to the world.
We are providing the platform for the aspiring teachers and studets to share 
their skills,creativity and knowledge to each other to empower and contribute 
in the growth and welless of mankind.
</p>
                    </section>
                    <div className="w-1/2">
              <img  src={steveJobs}
              className="drop-shadow-2xl"
              alt="about main page"
              id="text"
              style={{

              }}
/>

    </div>      
 </div>

<div className="carousel w-full">
  <div id="slide1" className="carousel-item relative w-full">
    <img src={apj} className="w-full" />
    <p className="text-xl text-gray-200">The only true wisdom is in knowing you know nothing.</p>
    <h3 className="text-2xl font-semibold">apj</h3>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide4" className="btn btn-circle">❮</a> 
      <a href="#slide2" className="btn btn-circle">❯</a>
    </div>
  </div> 

  <div id="slide2" className="carousel-item relative w-full">
    <img src={billGates} className="w-full" />
    <p className="text-xl text-gray-200">Success is a lousy teacher</p>
    <h3 className="text-2xl font-semibold">billGates</h3>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide1" className="btn btn-circle">❮</a> 
      <a href="#slide3" className="btn btn-circle">❯</a>
    </div>
  </div>


  <div id="slide3" className="carousel-item relative w-full">
    <img src={einstein} className="w-full" />
     <p className="text-xl text-gray-200">If you can't explain it simply, you don't understand it well enough.</p>
    <h3 className="text-2xl font-semibold">einstein</h3>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide2" className="btn btn-circle">❮</a> 
      <a href="#slide4" className="btn btn-circle">❯</a>
    </div>
  </div>


  <div id="slide4" className="carousel-item relative w-full">
    <img src={steveJobs} className="w-full" />
    <p className="text-xl text-gray-200">Stay hungry. Stay foolish.</p>
    <h3 className="text-2xl font-semibold">steveJobs</h3>
    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
      <a href="#slide3" className="btn btn-circle">❮</a> 
      <a href="#slide1" className="btn btn-circle">❯</a>
    </div>
  </div>
</div>

                
            </div>
        </Homelayout>
    );
}
export default Aboutus;