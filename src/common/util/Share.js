function shareContent(shareData) {
    // Check if shareData object has required properties
    if (!shareData.title) {
      throw new Error('Invalid shareData object: title property is required');
    }
    
    if (!shareData.text) {
      throw new Error('Invalid shareData object: text property is required');
    }
    
    if (!shareData.url) {
      throw new Error('Invalid shareData object: url property is required');
    }
  
    // Check if the navigator.share() API is supported
    if (navigator.share) {
      // Use the navigator.share() API to share content
      navigator.share(shareData)
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      // Fallback mechanism for browsers that do not support the API
      const fallbackUrl = `mailto:?subject=${encodeURIComponent(shareData.title)}&body=${encodeURIComponent(shareData.text)}%0D%0A${encodeURIComponent(shareData.url)}`;
      window.location.href = fallbackUrl;
    }
  }

  
    export default shareContent;