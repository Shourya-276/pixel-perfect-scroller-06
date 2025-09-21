import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const blogs = [
  {
    id: 1,
    title: "Current Real Estate Market Trends",
    date: "November 17, 2024",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
    size: "small"
  },
  {
    id: 2,
    title: "Green Real Estate: Sustainable Practices and Benefits",
    date: "November 17, 2024", 
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    size: "small"
  },
  {
    id: 3,
    title: "Common Mistakes in Real Estate Investing",
    subtitle: "Real estate investing is one of the most popular ways to...",
    date: "November 17, 2024",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop",
    size: "large"
  },
  {
    id: 4,
    title: "Emerging Real Estate Markets to Watch", 
    subtitle: "Real estate investing is one of the most popular ways to...",
    date: "November 17, 2024",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=300&fit=crop",
    size: "wide"
  },
  {
    id: 5,
    title: "How Interest Rates Affect Real Estate Prices",
    date: "November 17, 2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    size: "small"
  },
  {
    id: 6,
    title: "How to Assess Real Estate Market Conditions",
    date: "November 17, 2024",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
    size: "small"
  }
];

const BlogsAndArticlesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">Blogs and Articles</h2>
        </div>

        {/* Blogs grid */}
        <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12">
          {/* First row - 2 small cards + 1 large card */}
          <div className="sm:col-span-1">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-60 sm:h-64">
              <img
                src={blogs[0].image}
                alt={blogs[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs sm:text-sm mb-1 sm:mb-2">{blogs[0].date}</div>
                <h3 className="text-base sm:text-lg font-bold">{blogs[0].title}</h3>
                <Button variant="link" className="text-white p-0 h-auto mt-1 sm:mt-2 underline text-xs sm:text-sm">
                  Read more
                </Button>
              </div>
            </div>
          </div>

          <div className="sm:col-span-1">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-60 sm:h-64">
              <img
                src={blogs[1].image}
                alt={blogs[1].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs sm:text-sm mb-1 sm:mb-2">{blogs[1].date}</div>
                <h3 className="text-base sm:text-lg font-bold">{blogs[1].title}</h3>
                <Button variant="link" className="text-white p-0 h-auto mt-1 sm:mt-2 underline text-xs sm:text-sm">
                  Read more
                </Button>
              </div>
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-2">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-60 sm:h-64">
              <img
                src={blogs[2].image}
                alt={blogs[2].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs sm:text-sm mb-1 sm:mb-2">{blogs[2].date}</div>
                <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">{blogs[2].title}</h3>
                <p className="text-xs sm:text-sm text-gray-200 mb-2 sm:mb-3">{blogs[2].subtitle}</p>
                <Button className="bg-primary hover:bg-primary/90 text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2">
                  Read more
                </Button>
              </div>
            </div>
          </div>

          {/* Second row - 1 wide card + 2 small cards */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-60 sm:h-64">
              <img
                src={blogs[3].image}
                alt={blogs[3].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs sm:text-sm mb-1 sm:mb-2">{blogs[3].date}</div>
                <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">{blogs[3].title}</h3>
                <p className="text-xs sm:text-sm text-gray-200 mb-2 sm:mb-3">{blogs[3].subtitle}</p>
                <Button className="bg-primary hover:bg-primary/90 text-xs sm:text-sm px-3 py-1 sm:px-4 sm:py-2">
                  Read More
                </Button>
              </div>
            </div>
          </div>

          <div className="sm:col-span-1">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-60 sm:h-64">
              <img
                src={blogs[4].image}
                alt={blogs[4].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs sm:text-sm mb-1 sm:mb-2">{blogs[4].date}</div>
                <h3 className="text-base sm:text-lg font-bold">{blogs[4].title}</h3>
                <Button variant="link" className="text-white p-0 h-auto mt-1 sm:mt-2 underline text-xs sm:text-sm">
                  Read more
                </Button>
              </div>
            </div>
          </div>

          <div className="sm:col-span-1">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-60 sm:h-64">
              <img
                src={blogs[5].image}
                alt={blogs[5].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-xs sm:text-sm mb-1 sm:mb-2">{blogs[5].date}</div>
                <h3 className="text-base sm:text-lg font-bold">{blogs[5].title}</h3>
                <Button variant="link" className="text-white p-0 h-auto mt-1 sm:mt-2 underline text-xs sm:text-sm">
                  Read more
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel for small screens */}
        <div className="lg:hidden relative mb-8">
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {blogs.map((blog, index) => (
                <CarouselItem key={index} className="pl-4 basis-full sm:basis-1/2">
                  <div className="relative bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 h-60">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="text-xs mb-1">{blog.date}</div>
                      <h3 className="text-base font-bold">{blog.title}</h3>
                      {blog.subtitle && <p className="text-xs text-gray-200 mb-2">{blog.subtitle}</p>}
                      <Button variant="link" className="text-white p-0 h-auto mt-1 underline text-xs">
                        Read more
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>
        </div>

        {/* View more button */}
        <div className="text-center mt-8 lg:mt-12">
          <Button size="lg" className="bg-primary hover:bg-primary/90 px-8 py-3 text-base lg:px-12 lg:py-3 lg:text-lg">
            View more
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogsAndArticlesSection;