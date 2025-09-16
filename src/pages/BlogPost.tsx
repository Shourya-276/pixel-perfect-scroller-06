import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import DiscoverNeighborhoodsSection from "@/components/DiscoverNeighborhoodsSection";
import MumbaiHomesSection from "@/components/MumbaiHomesSection";
import { useParams } from "react-router-dom";
import blogHero1 from "@/assets/blog-hero-1.jpg";

const blogData = {
  "common-mistakes-real-estate": {
    title: "Green Real Estate: Sustainable Practices and Benefits.",
    date: "November 17, 2024",
    image: blogHero1,
    content: `
Real estate investing is one of the most popular ways to build wealth in today's economy. However, many first-time investors fall victim to common pitfalls that can derail their investment goals. Understanding real estate mistakes and avoiding investment errors can help you make smarter decisions and build long-term wealth successfully.

Understanding Real Estate Investing

Before diving into real estate investing, it's crucial to have a well-rounded understanding of what it entails. Real estate sales are different in every market, and successful real estate investing depends on proper research and being knowledgeable about regulations and market trends.

Common Real Estate Errors

Several frequent errors or oversights appear in real estate investing, whether you're a beginner or experienced investor. By learning about these common mistakes, we can develop thorough research. Failing to conduct thorough research includes not understanding the local market, neglecting to check a property's history, or overlooking inspection reports. These oversights often result in poor investment decisions and financial losses.

Another frequent error is overestimating returns. Investment advisors often look for lower costs, such as accounting for repairs, taxes, insurance, and unexpected repairs. These underbid costs can erode profits and lead to failure. Choosing the wrong location is another common error. Buying in a declining area or one with poor location factors is good for investors. Choosing poor financing is equally important—always debt loans are manageable and align with your financial capacity.

Property Investment Pitfalls to Avoid

When dealing with real estate transactions, there are many common that can end up in unexpected costs that lure you to spend more than what a property is worth. This typically happens when investors fail to get proper property valuations or fail to factor in all the costs of purchasing a property, including closing costs, inspections, maintenance reserves, and property taxes. These potential real estate blunders can have significant consequences and affect investors more than expected.

Another frequent error is overestimating returns. Investment advisors focus solely on best-case scenarios without accounting for repairs, taxes, insurance, and unexpected expenses. These underbid costs can erode profits and lead to failure. Choosing the wrong location is another common error. Buying properties in declining areas or ones with poor location factors significantly increases your chances of business failure.

Avoiding Real Estate Risks

Though real estate investment business. Through due diligence is essential. Always inspect properties, research the local market, and understand all associated costs before purchasing. Choosing proper financing is equally important—ensure debt loads are manageable and align with your financial goals.

Finally, develop a business plan. Those experts especially specialize in real estate deal finding strategies, tax implications, and regularly reviewing your investment portfolio. Understanding common mistakes and proactively avoiding them will put you on a better path and significantly increase your chances of business success.
    `
  },
  "emerging-markets": {
    title: "Emerging Real Estate Markets to Watch",
    date: "November 17, 2024",
    image: blogHero1,
    content: "Content for emerging markets article..."
  }
};

const relatedNews = [
  {
    id: 1,
    title: "Green Real Estate: Sustainable Practices and Benefits.",
    date: "November 17, 2024",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Green Real Estate: Sustainable Practices and Benefits.",
    date: "November 17, 2024", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop"
  },
  {
    id: 3,
    title: "Green Real Estate: Sustainable Practices and Benefits.",
    date: "November 17, 2024",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop"
  }
];

const BlogPost = () => {
  const { slug } = useParams();
  const blog = blogData[slug as keyof typeof blogData];

  if (!blog) {
    return <div>Blog post not found</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Blog Post Content */}
      <article className="py-8">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Date */}
          <div className="text-sm text-gray-500 mb-4">{blog.date}</div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 leading-tight">
            {blog.title}
          </h1>
          
          {/* Hero Image */}
          <div className="mb-8">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
            />
          </div>
          
          {/* Content */}
          <div className="prose prose-lg max-w-none">
            {blog.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 leading-relaxed mb-6">
                {paragraph.trim()}
              </p>
            ))}
          </div>
        </div>
      </article>

      {/* Related News Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Related News</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedNews.map((news) => (
              <div key={news.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 mb-2 leading-tight">
                    {news.title}
                  </h3>
                  <div className="text-sm text-gray-500 mb-4">{news.date}</div>
                  <Button 
                    style={{ backgroundColor: '#0D6ABC' }} 
                    className="hover:opacity-90 w-full"
                  >
                    Read More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom sections from homepage */}
      <DiscoverNeighborhoodsSection />
      <MumbaiHomesSection />
    </div>
  );
};

export default BlogPost;