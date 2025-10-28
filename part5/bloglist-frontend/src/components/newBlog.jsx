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
            aria-label= 'title'
            onChange={handleChange}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={values.author}
            aria-label="author"
            name="author"
            onChange={handleChange}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            value={values.url}
            aria-label="url"
            name="url"
            onChange={handleChange}
          />
        </div>
        <button type="submit" aria-label="create blog">Create blog</button>
      </form>
    </div>
  )
}

export default BlogForm
