// Mock highlight utilities - in a real app, you might use highlight.js or similar
export const highlight = {
  configure: () => {
    // Mock configuration
  },
  highlight: (code: string) => {
    // Mock highlighting - just return the code as is
    return { value: code };
  },
};

export default highlight;
