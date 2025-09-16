import { Play } from "lucide-react";

const VirtualTourSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Virtual Tour</h2>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((index) => (
            <div
              key={index}
              className="relative bg-gray-300 rounded-lg overflow-hidden aspect-video group cursor-pointer hover:shadow-xl transition-shadow duration-300"
            >
              {/* Video placeholder */}
              <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                {/* Play button */}
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Play className="h-8 w-8 text-gray-800 ml-1" fill="currentColor" />
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

        {/* Company logos section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {/* Yogesha Property */}
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-blue-600 text-white p-4 rounded-lg">
              <div className="text-lg font-bold">YP</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-blue-600">YOGESHA PROPERTY</div>
            </div>
          </div>

          {/* Prakrithi Realtors */}
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-yellow-500 text-white p-4 rounded-lg">
              <div className="text-lg font-bold">P</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-yellow-600">PRAKRITHI REALTORS</div>
              <div className="text-xs text-gray-600">Constructing the Future</div>
            </div>
          </div>

          {/* Vighnaharta Group */}
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-red-600 text-white p-4 rounded-lg">
              <div className="text-lg font-bold">V</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-red-600">VIGHNAHARTA</div>
              <div className="font-bold text-red-600">GROUP</div>
              <div className="text-xs text-gray-600">A VISION FOR YOUR LIFE</div>
            </div>
          </div>

          {/* Swastik */}
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-blue-700 text-white p-4 rounded-lg">
              <div className="text-lg font-bold">S</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-blue-700">SWASTIK</div>
              <div className="text-xs text-blue-700">BUILDERS & DEVELOPERS</div>
              <div className="text-xs text-gray-600">A legacy of trust</div>
            </div>
          </div>

          {/* Suji Builders */}
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-blue-800 text-white p-4 rounded-lg">
              <div className="text-lg font-bold">S</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-blue-800">SUJI</div>
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