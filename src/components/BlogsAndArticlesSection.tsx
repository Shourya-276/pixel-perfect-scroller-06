import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { useWebsiteData } from "@/contexts/WebsiteDataContext";
import { X } from "lucide-react";

// Define interfaces within the file
interface Blog {
  id: number;
  title: string;
  subtitle?: string;
  date: string;
  image: string;
  content: string;
  size: "small" | "large" | "wide";
}

interface BlogsData {
  title: string;
  ctaText: string;
  blogs: Blog[];
}

// Utility to generate a preview text (1-2 lines)
const generatePreview = (blog: Blog) => {
  return (
    blog.subtitle ||
    blog.content.split('.').slice(0, 2).join('. ') +
    (blog.content.split('.').length > 2 ? '.' : '')
  );
};

const BlogsAndArticlesSection = () => {
  const { websiteData } = useWebsiteData();
  const { title, ctaText, blogs } = websiteData.blogsAndArticles as BlogsData;
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open modal with selected blog
  const handleReadMore = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  // Filter other blogs for sidebar
  const otherBlogs = selectedBlog ? blogs.filter((b) => b.id !== selectedBlog.id) : blogs;

  console.log('BlogsAndArticlesSection data:', { title, ctaText, blogIds: blogs.map(b => b.id), selectedBlogId: selectedBlog?.id });

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            {title || "Blogs and Articles"}
          </h2>
        </div>

        {/* Blogs Grid (Large Screens) */}
        <div className="hidden lg:grid grid-cols-4 gap-6 mb-12">
          {blogs.map((blog, index) => {
            const isLarge = blog.size === "large" && index === 2;
            const isWide = blog.size === "wide" && index === 3;
            return (
              <div
                key={blog.id}
                className={`${isLarge ? "col-span-2" : isWide ? "col-span-2" : "col-span-1"}`}
              >
                <div
                  className={`relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
                    isWide ? "h-[404px]" : "h-64"
                  }`}
                >
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-sm mb-2">{blog.date}</div>
                    <h3
                      className={`font-bold line-clamp-2 ${
                        isLarge || isWide ? "text-2xl" : "text-lg"
                      }`}
                    >
                      {blog.title}
                    </h3>
                    <p className="text-sm text-gray-200 mb-3 line-clamp-2">
                      {generatePreview(blog)}
                    </p>
                    <Button
                      variant={isLarge || isWide ? "default" : "link"}
                      className={`${
                        isLarge || isWide
                          ? "bg-primary hover:bg-primary/90 px-4 py-2"
                          : "text-white p-0 h-auto underline"
                      } text-sm`}
                      onClick={() => handleReadMore(blog)}
                    >
                      Read more
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel (Mobile/Small Screens) */}
        <div className="lg:hidden relative mb-6">
          <Carousel
            opts={{ align: "start", loop: true, slidesToScroll: 1 }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {blogs.map((blog, index) => (
                <CarouselItem
                  key={blog.id}
                  className="pl-2 basis-4/5 sm:basis-1/2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-52 group">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <div className="text-[10px] mb-1 opacity-80">{blog.date}</div>
                      <h3 className="text-sm font-bold line-clamp-2 mb-1">
                        {blog.title}
                      </h3>
                      <p className="text-[10px] text-gray-200 mb-1 line-clamp-2">
                        {generatePreview(blog)}
                      </p>
                      <Button
                        variant="link"
                        className="text-white p-0 h-auto underline text-[10px] hover:text-primary"
                        onClick={() => handleReadMore(blog)}
                      >
                        Read more →
                      </Button>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-1 h-8 w-8 bg-white/90 hover:bg-white" />
            <CarouselNext className="right-1 h-8 w-8 bg-white/90 hover:bg-white" />
          </Carousel>
        </div>

        {/* View More Button */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 px-12 py-3 text-lg"
          >
            {ctaText || "View More"}
          </Button>
        </div>

        {/* Blog Detail Modal */}
        {selectedBlog && (
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedBlog.title}</span>
                  <DialogClose className="text-gray-500 hover:text-gray-700">
                    <X className="h-5 w-5" />
                  </DialogClose>
                </DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Blog Content */}
                <div className="lg:col-span-2">
                  <article className="bg-white rounded-lg p-6">
                    <img
                      src={selectedBlog.image}
                      alt={selectedBlog.title}
                      className="w-full h-64 sm:h-80 object-cover rounded-lg mb-6"
                    />
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                      {selectedBlog.title}
                    </h1>
                    {selectedBlog.subtitle && (
                      <h2 className="text-lg sm:text-xl text-gray-600 mb-4">
                        {selectedBlog.subtitle}
                      </h2>
                    )}
                    <p className="text-sm text-gray-500 mb-6">{selectedBlog.date}</p>
                    <div className="prose prose-sm sm:prose-base max-w-none text-gray-700">
                      {selectedBlog.content}
                    </div>
                    <Button
                      className="mt-6 bg-primary hover:bg-primary/90"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Back to All Blogs
                    </Button>
                  </article>
                </div>
                {/* Sidebar: Other Blogs */}
                <div className="lg:col-span-1">
                  <Card className="bg-white">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Other Blogs</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {otherBlogs.length > 0 ? (
                        otherBlogs.map((blog) => (
                          <div
                            key={blog.id}
                            className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => handleReadMore(blog)}
                          >
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
                                {blog.title}
                              </h3>
                              <p className="text-xs text-gray-500 mb-1">{blog.date}</p>
                              <p className="text-xs text-gray-600 line-clamp-2">
                                {generatePreview(blog)}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-500">No other blogs available.</p>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};

export default BlogsAndArticlesSection;