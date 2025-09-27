import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import DiscoverNeighborhoodsSection from "@/components/DiscoverNeighborhoodsSection";
import MumbaiHomesSection from "@/components/MumbaiHomesSection";
import blogHero1 from "@/assets/blog-hero-1.jpg";
import blogHero2 from "@/assets/blog-hero-2.jpg";
import blogCard1 from "@/assets/blog-card-1.jpg";
import blogCard2 from "@/assets/blog-card-2.jpg";
import blogCard3 from "@/assets/blog-card-3.jpg";

const blogPosts = [
  {
    id: 1,
    title: "Green Real Estate: Sustainable Practices and Benefits.",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor",
    date: "November 17, 2024",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Green Real Estate: Sustainable Practices and Benefits.", 
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis",
    date: "November 17, 2024",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Green Real Estate: Sustainable Practices and Benefits.",
    subtitle: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor",
    date: "November 17, 2024", 
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop"
  }
];

const Blogs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Blue Hero Section */}
      <section className="py-12" style={{ backgroundColor: '#0D6ABC' }}>
        <div className="container mx-auto px-6">
          {/* Section header */}
          <div className="mb-6 lg:mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-white text-center lg:text-left">Blogs and Articles</h1>
          </div>

          {/* Featured blogs grid - matching exact layout from image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Left side - Large featured card */}
            <div className="relative bg-white rounded-tl-[40px] rounded-br-[40px] rounded overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-64 lg:h-80">
              <img
                src={blogHero1}
                alt="Common Mistakes in Real Estate Investing"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white lg:bottom-6 lg:left-6 lg:right-6">
                <h3 className="text-lg lg:text-xl font-bold mb-1 leading-tight lg:mb-2">Common Mistakes in Real Estate Investing</h3>
                <p className="text-xs lg:text-sm text-gray-200 mb-2 opacity-90 lg:mb-4">Real estate investing is one of the most popular ways to...</p>
                <Button 
                  className="bg-white text-black hover:bg-gray-100 rounded-md px-3 py-1.5 text-xs font-medium lg:px-4 lg:py-2 lg:text-sm"
                  onClick={() => window.location.href = '/blogs/common-mistakes-real-estate'}
                >
                  Read more
                </Button>
              </div>
            </div>

            {/* Right side - Top medium card + bottom 3 small cards */}
            <div className="space-y-4 lg:space-y-6">
              {/* Top medium card */}
              <div className="relative bg-white rounded-tl-[40px] rounded-br-[40px] rounded overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-32 lg:h-36">
                <img
                  src={blogHero2}
                  alt="Emerging Real Estate Markets to Watch"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-white lg:bottom-4 lg:left-4 lg:right-4">
                  <h3 className="text-sm lg:text-base font-bold mb-2 leading-tight lg:mb-3">Emerging Real Estate Markets to Watch</h3>
                  <Button 
                    className="bg-white text-black hover:bg-gray-100 rounded-md px-2 py-1 text-xs font-medium lg:px-3 lg:py-1.5 lg:text-sm"
                    onClick={() => window.location.href = '/blogs/emerging-markets'}
                  >
                    Read more
                  </Button>
                </div>
              </div>

              {/* Bottom row of 3 small cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative bg-white rounded-tl-[40px] rounded-br-[40px] rounded overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-28 sm:h-32">
                  <img
                    src={blogCard1}
                    alt="What's happening Know more"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <h4 className="text-xs font-bold mb-1 leading-tight">What's happening Know more</h4>
                    <Button 
                      variant="link" 
                      className="text-white p-0 h-auto text-xs underline font-medium"
                      onClick={() => window.location.href = '/blogs/whats-happening-1'}
                    >
                      Read more
                    </Button>
                  </div>
                </div>

                <div className="relative bg-white rounded-tl-[40px] rounded-br-[40px] rounded overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-28 sm:h-32">
                  <img
                    src={blogCard2}
                    alt="What's happening Know more"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <h4 className="text-xs font-bold mb-1 leading-tight">What's happening Know more</h4>
                    <Button 
                      variant="link" 
                      className="text-white p-0 h-auto text-xs underline font-medium"
                      onClick={() => window.location.href = '/blogs/whats-happening-2'}
                    >
                      Read more
                    </Button>
                  </div>
                </div>

                <div className="relative bg-white rounded-tl-[40px] rounded-br-[40px] rounded overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-28 sm:h-32">
                  <img
                    src={blogCard3}
                    alt="What's happening Know more"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <h4 className="text-xs font-bold mb-1 leading-tight">What's happening Know more</h4>
                    <Button 
                      variant="link" 
                      className="text-white p-0 h-auto text-xs underline font-medium"
                      onClick={() => window.location.href = '/blogs/whats-happening-3'}
                    >
                      Read more
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts List Section */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="space-y-6 lg:space-y-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="flex flex-col md:flex-row gap-4 lg:gap-6 p-4 lg:p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="md:w-64 flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 md:h-32 object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-xs lg:text-sm text-gray-500 mb-1 lg:mb-2">{post.date}</div>
                  <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-2 lg:mb-3">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed lg:mb-4">{post.subtitle}</p>
                  <Button style={{ backgroundColor: '#0D6ABC' }} className="hover:opacity-90 text-sm px-3 py-1.5 h-auto lg:px-4 lg:py-2">
                    Read more
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Load more button */}
          <div className="text-center mt-10 lg:mt-12">
            <Button 
              size="lg" 
              style={{ backgroundColor: '#0D6ABC' }} 
              className="hover:opacity-90 px-8 py-3 text-base lg:px-12 lg:py-3 lg:text-lg"
            >
              Load more
            </Button>
          </div>
        </div>
      </section>

      {/* Bottom sections from homepage */}
      <DiscoverNeighborhoodsSection />
      <MumbaiHomesSection />
    </div>
  );
};

export default Blogs;