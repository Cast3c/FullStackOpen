const BlogForm = ({ values, handleBlogSubmit, handleChange }) => {
  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleBlogSubmit}>
        <div>
          Title
          <input
            type="text"
            value={values.title}
            name="title"
            onChange={handleChange}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={values.author}
            name="author"
            onChange={handleChange}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            value={values.url}
            name="url"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create blog</button>
      </form>
    </div>
  );
};

export default BlogForm;
