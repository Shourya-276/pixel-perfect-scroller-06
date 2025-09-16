import { Button } from "@/components/ui/button";

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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Blogs and Articles</h2>
        </div>

        {/* Blogs grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {/* First row - 2 small cards + 1 large card */}
          <div className="md:col-span-1">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-64">
              <img
                src={blogs[0].image}
                alt={blogs[0].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-sm mb-2">{blogs[0].date}</div>
                <h3 className="text-lg font-bold">{blogs[0].title}</h3>
                <Button variant="link" className="text-white p-0 h-auto mt-2 underline">
                  Read more
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-64">
              <img
                src={blogs[1].image}
                alt={blogs[1].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-sm mb-2">{blogs[1].date}</div>
                <h3 className="text-lg font-bold">{blogs[1].title}</h3>
                <Button variant="link" className="text-white p-0 h-auto mt-2 underline">
                  Read more
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-64">
              <img
                src={blogs[2].image}
                alt={blogs[2].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-sm mb-2">{blogs[2].date}</div>
                <h3 className="text-2xl font-bold mb-2">{blogs[2].title}</h3>
                <p className="text-sm text-gray-200 mb-3">{blogs[2].subtitle}</p>
                <Button className="bg-primary hover:bg-primary/90">
                  Read more
                </Button>
              </div>
            </div>
          </div>

          {/* Second row - 1 wide card + 2 small cards */}
          <div className="md:col-span-2">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-64">
              <img
                src={blogs[3].image}
                alt={blogs[3].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-sm mb-2">{blogs[3].date}</div>
                <h3 className="text-2xl font-bold mb-2">{blogs[3].title}</h3>
                <p className="text-sm text-gray-200 mb-3">{blogs[3].subtitle}</p>
                <Button className="bg-primary hover:bg-primary/90">
                  Read More
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-64">
              <img
                src={blogs[4].image}
                alt={blogs[4].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-sm mb-2">{blogs[4].date}</div>
                <h3 className="text-lg font-bold">{blogs[4].title}</h3>
                <Button variant="link" className="text-white p-0 h-auto mt-2 underline">
                  Read more
                </Button>
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-64">
              <img
                src={blogs[5].image}
                alt={blogs[5].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-sm mb-2">{blogs[5].date}</div>
                <h3 className="text-lg font-bold">{blogs[5].title}</h3>
                <Button variant="link" className="text-white p-0 h-auto mt-2 underline">
                  Read more
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* View more button */}
        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90 px-12 py-3 text-lg">
            View more
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogsAndArticlesSection;