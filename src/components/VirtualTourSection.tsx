import { Play } from "lucide-react";

const VirtualTourSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Virtual Tour</h2>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="relative bg-gray-300 rounded-lg overflow-hidden aspect-video group cursor-pointer hover:shadow-xl transition-shadow duration-300"
            >
              {/* Video placeholder */}
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                {/* Play button */}
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 group-hover:scale-110 transition-transform duration-300 shadow-lg lg:p-4">
                  <Play className="h-6 w-6 text-gray-800 ml-1 lg:h-8 lg:w-8" fill="currentColor" />
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Company logos section */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8 items-center">
          {/* Yogesha Property */}
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-blue-600 text-white p-3 rounded-lg lg:p-4">
              <div className="text-base font-bold lg:text-lg">YP</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-blue-600 text-sm lg:text-base">YOGESHA PROPERTY</div>
            </div>
          </div>

          {/* Prakrithi Realtors */}
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-yellow-500 text-white p-3 rounded-lg lg:p-4">
              <div className="text-base font-bold lg:text-lg">P</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-yellow-600 text-sm lg:text-base">PRAKRITHI REALTORS</div>
              <div className="text-xs text-gray-600">Constructing the Future</div>
            </div>
          </div>

          {/* Vighnaharta Group */}
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-red-600 text-white p-3 rounded-lg lg:p-4">
              <div className="text-base font-bold lg:text-lg">V</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-red-600 text-sm lg:text-base">VIGHNAHARTA</div>
              <div className="font-bold text-red-600 text-sm lg:text-base">GROUP</div>
              <div className="text-xs text-gray-600">A VISION FOR YOUR LIFE</div>
            </div>
          </div>

          {/* Swastik */}
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-blue-700 text-white p-3 rounded-lg lg:p-4">
              <div className="text-base font-bold lg:text-lg">S</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-blue-700 text-sm lg:text-base">SWASTIK</div>
              <div className="text-xs text-blue-700">BUILDERS & DEVELOPERS</div>
              <div className="text-xs text-gray-600">A legacy of trust</div>
            </div>
          </div>

          {/* Suji Builders */}
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-blue-800 text-white p-3 rounded-lg lg:p-4">
              <div className="text-base font-bold lg:text-lg">S</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-blue-800 text-sm lg:text-base">SUJI</div>
              <div className="text-xs text-blue-800">Builders & Developers</div>
              <div className="text-xs text-gray-600">CREATING LIFE EXPERIENCES & BUILDING LEGACIES</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualTourSection;