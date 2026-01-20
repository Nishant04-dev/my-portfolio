import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, ArrowRight, Tag, Calendar, ExternalLink, RefreshCw, Wifi, WifiOff } from "lucide-react";

interface WikiArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  tags: string[];
  image: string;
  url: string;
  featured?: boolean;
}

const WIKI_TOPICS = {
  "Programming": ["JavaScript", "Python_(programming_language)", "React_(JavaScript_library)", "TypeScript", "Artificial_intelligence", "Machine_learning"],
  "Tech": ["Cloud_computing", "Blockchain", "Cybersecurity", "Internet_of_Things", "5G", "Quantum_computing"],
  "Startup": ["Startup_company", "Venture_capital", "Y_Combinator", "Unicorn_(finance)", "Silicon_Valley", "Entrepreneurship"],
  "AI": ["ChatGPT", "Large_language_model", "Neural_network", "Deep_learning", "Computer_vision", "Natural_language_processing"],
  "Web Dev": ["Web_development", "HTML5", "CSS", "Node.js", "API", "Progressive_web_application"],
  "Data Science": ["Data_science", "Big_data", "Data_analysis", "Statistics", "Data_visualization", "Apache_Spark"]
};

const categories = ["All", "Programming", "Tech", "Startup", "AI", "Web Dev", "Data Science"];

const fetchWikipediaArticle = async (title: string, category: string): Promise<WikiArticle | null> => {
  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
    );
    
    if (!response.ok) return null;
    
    const data = await response.json();
    
    // Calculate approximate read time based on extract length
    const wordCount = data.extract?.split(' ').length || 0;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    
    // Generate tags from title
    const tags = title.split('_').filter(t => t.length > 2 && t !== '(programming' && t !== 'language)').slice(0, 3);
    
    return {
      id: data.pageid?.toString() || title,
      title: data.title || title.replace(/_/g, ' '),
      excerpt: data.extract || 'No description available',
      category,
      readTime: `${readTime} min read`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tags: tags.length > 0 ? tags : [category],
      image: data.thumbnail?.source || data.originalimage?.source || `https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60`,
      url: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${title}`,
      featured: false
    };
  } catch (error) {
    console.error(`Error fetching ${title}:`, error);
    return null;
  }
};

const BlogSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [articles, setArticles] = useState<WikiArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const fetchArticles = async () => {
    setIsLoading(true);
    const allArticles: WikiArticle[] = [];
    
    // Fetch articles from each category
    for (const [category, topics] of Object.entries(WIKI_TOPICS)) {
      // Randomly select 2 topics from each category for variety
      const shuffled = topics.sort(() => Math.random() - 0.5).slice(0, 2);
      
      const promises = shuffled.map(topic => fetchWikipediaArticle(topic, category));
      const results = await Promise.all(promises);
      
      results.forEach(article => {
        if (article) allArticles.push(article);
      });
    }
    
    // Mark some as featured
    if (allArticles.length > 0) {
      const featuredIndices = [0, Math.min(2, allArticles.length - 1)];
      featuredIndices.forEach(i => {
        if (allArticles[i]) allArticles[i].featured = true;
      });
    }
    
    setArticles(allArticles);
    setLastUpdated(new Date());
    setIsLoading(false);
    
    // Cache in localStorage
    localStorage.setItem('wikiArticles', JSON.stringify(allArticles));
    localStorage.setItem('wikiLastUpdated', new Date().toISOString());
  };

  useEffect(() => {
    // Check online status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load cached articles first
    const cached = localStorage.getItem('wikiArticles');
    const cachedDate = localStorage.getItem('wikiLastUpdated');
    
    if (cached) {
      setArticles(JSON.parse(cached));
      setLastUpdated(cachedDate ? new Date(cachedDate) : null);
      setIsLoading(false);
    }
    
    // Check if we need to refresh (daily update)
    const shouldRefresh = () => {
      if (!cachedDate) return true;
      const lastUpdate = new Date(cachedDate);
      const now = new Date();
      // Refresh if more than 24 hours old
      return (now.getTime() - lastUpdate.getTime()) > 24 * 60 * 60 * 1000;
    };
    
    if (shouldRefresh() && isOnline) {
      fetchArticles();
    } else if (!cached) {
      fetchArticles();
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const filteredArticles = selectedCategory === "All"
    ? articles
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticles = articles.filter(article => article.featured);

  const handleReadMore = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="blog" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Live from Wikipedia</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Tech </span>
            <span className="text-primary">Insights</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Real-time articles about technology, programming, startups, and more
          </p>

          {/* Status Bar */}
          <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            {isOnline ? (
              <Wifi className="w-4 h-4 text-primary" />
            ) : (
              <WifiOff className="w-4 h-4 text-destructive" />
            )}
            {isOnline ? 'Online' : 'Offline'}
            </span>
            {lastUpdated && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                Updated: {lastUpdated.toLocaleDateString()}
              </span>
            )}
            <motion.button
              onClick={fetchArticles}
              disabled={isLoading || !isOnline}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 hover:bg-primary/20 text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </motion.button>
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card border border-border/50"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Loading State */}
        {isLoading && articles.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading articles from Wikipedia...</p>
            </div>
          </div>
        )}

        {/* Featured Posts */}
        {selectedCategory === "All" && featuredArticles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-12"
          >
            <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <span className="w-8 h-1 bg-primary rounded-full" />
              Featured Articles
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onMouseEnter={() => setHoveredId(article.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleReadMore(article.url)}
                  className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 cursor-pointer"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="relative w-full md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/80" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {article.category}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>

                      <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h4>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {article.date}
                        </span>
                        <motion.span
                          className="text-primary font-medium text-sm flex items-center gap-1"
                          animate={{ x: hoveredId === article.id ? 5 : 0 }}
                        >
                          Read on Wikipedia
                          <ExternalLink className="w-4 h-4" />
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        )}

        {/* Blog Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredArticles.filter(a => selectedCategory !== "All" || !a.featured).map((article, index) => (
              <motion.article
                key={article.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(article.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleReadMore(article.url)}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium backdrop-blur-sm">
                      {article.category}
                    </span>
                  </div>

                  {/* Read Article Overlay */}
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: hoveredId === article.id ? 1 : 0,
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm"
                  >
                    <div className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium flex items-center gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Read on Wikipedia
                    </div>
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-md bg-secondary/50 text-muted-foreground text-xs flex items-center gap-1"
                      >
                        <Tag className="w-2.5 h-2.5" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10" />
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {!isLoading && filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found in this category.</p>
          </div>
        )}

        {/* Wikipedia Attribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Content sourced from Wikipedia • Auto-updates daily
          </p>
          <motion.a
            href="https://en.wikipedia.org"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-full bg-card border border-border hover:border-primary text-foreground font-medium transition-all duration-300 inline-flex items-center gap-2"
          >
            Explore More on Wikipedia
            <ArrowRight className="w-4 h-4" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;
