const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const categoryText = document.getElementById('category');
const newQuoteBtn = document.getElementById('new-quote-btn');
const tweetBtn = document.getElementById('tweet-btn');
const loader = document.getElementById('loader');
const categorySelect = document.getElementById('category-select');

const quotesDatabase = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "inspiration" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "life" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "inspiration" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", author: "Martin Luther King Jr.", category: "wisdom" },
    { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela", category: "success" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", category: "success" },
    { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs", category: "life" },
    { text: "If life were predictable it would cease to be life, and be without flavor.", author: "Eleanor Roosevelt", category: "life" },
    { text: "If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.", author: "Oprah Winfrey", category: "happiness" },
    { text: "If you set your goals ridiculously high and it's a failure, you will fail above everyone else's success.", author: "James Cameron", category: "success" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", category: "wisdom" },
    { text: "The journey of a thousand miles begins with one step.", author: "Lao Tzu", category: "wisdom" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "inspiration" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "success" },
    { text: "Our lives begin to end the day we become silent about things that matter.", author: "Martin Luther King Jr.", category: "wisdom" },
    { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama", category: "happiness" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama", category: "happiness" },
    { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas A. Edison", category: "success" },
    { text: "You only live once, but if you do it right, once is enough.", author: "Mae West", category: "life" },
    { text: "The mind is everything. What you think you become.", author: "Buddha", category: "wisdom" },
    { text: "The best revenge is massive success.", author: "Frank Sinatra", category: "success" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "inspiration" },
    { text: "Do not go where the path may lead, go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson", category: "inspiration" },
    { text: "Happiness is not by chance, but by choice.", author: "Jim Rohn", category: "happiness" },
    { text: "Life is really simple, but we insist on making it complicated.", author: "Confucius", category: "life" },
    { text: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll", category: "life" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill", category: "success" },
    { text: "If opportunity doesn't knock, build a door.", author: "Milton Berle", category: "success" },
    { text: "Happiness is a warm puppy.", author: "Charles M. Schulz", category: "happiness" },
    { text: "The secret of getting ahead is getting started.", author: "Mark Twain", category: "success" }
];

// Function to show loading
function showLoadingSpinner() {
    loader.style.display = 'block';
    quoteText.style.display = 'none';
    authorText.style.display = 'none';
    categoryText.style.display = 'none';
}

// Function to hide loading
function hideLoadingSpinner() {
    loader.style.display = 'none';
    quoteText.style.display = 'block';
    authorText.style.display = 'block';
    categoryText.style.display = 'block';
}

function fetchQuoteFromAPI(category = 'all') {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filteredQuotes = quotesDatabase;

            // Filter by category if not "all"
            if (category !== 'all') {
                filteredQuotes = quotesDatabase.filter(quote => quote.category === category);
            }

            // If no quotes match the category, use all quotes
            if (filteredQuotes.length === 0) {
                filteredQuotes = quotesDatabase;
            }

            // Get random quote from filtered list
            const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
            resolve(filteredQuotes[randomIndex]);
        }, 600);
    });
}

// Update the quote display
function displayQuote(quote) {
    quoteText.textContent = `"${quote.text}"`;
    authorText.textContent = `- ${quote.author}`;
    categoryText.textContent = `Category: ${quote.category.charAt(0).toUpperCase() + quote.category.slice(1)}`;

    // Update tweet button
    tweetBtn.onclick = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${quote.text}" - ${quote.author}`)}`;
        window.open(twitterUrl, '_blank');
    };
}

// Get a new quote
async function getQuote() {
    showLoadingSpinner();

    try {
        const selectedCategory = categorySelect.value;
        const quote = await fetchQuoteFromAPI(selectedCategory);
        displayQuote(quote);
    } catch (error) {
        console.error('Error getting quote:', error);
        quoteText.textContent = "Something went wrong. Please try again.";
        authorText.textContent = "";
        categoryText.textContent = "";
    } finally {
        hideLoadingSpinner();
    }
}

// Event listeners
newQuoteBtn.addEventListener('click', getQuote);
categorySelect.addEventListener('change', getQuote);

getQuote();