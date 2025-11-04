import { expect } from "@playwright/test"

const loginWith = async ( page, username, password ) => {
    const buttonLog = await page.getByRole('button', { name: 'Login' })
    await buttonLog.click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await buttonLog.click()
}

const createBlog = async (page, title, author, url) => {
    await page.getByRole('button', { name: 'new blog' }).click()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)
    await page.getByRole('button', { name: 'Create blog' }).click()
    await page.getByText(`Title: '${title}'`)
}

const editBlog = async (page, title) => {
    const blog = await page.locator('[data-testid="blog-item"]', { hasText: `Title: ${title}`})
    await blog.getByRole('button', { name: 'View info' }).click()

    const likesElement = parseInt(await blog.getByTestId('likes-count').textContent(), 10)
    await blog.getByRole('button', { name: 'like' }).click()

    await expect(blog.getByTestId('likes-count')).toHaveText(String(likesElement + 1 ))
}

const likeBlog = async (page, title, times) => {
    const blog = await page.locator('[data-testid="blog-item"]', { hasText: `Title: ${title}`})
    const likesElement = parseInt(await blog.getByTestId('likes-count').textContent(), 10)
    await blog.getByRole('button', { name: 'View info' }).click()
    for(let i = 0 ; i < times ; i++){
        const likeBtn = blog.getByRole('button', { name: 'like' })

        await likeBtn.click()

        await page.waitForTimeout(500)
    }

}

const deleteBlog = async (page, title, userLogged) => {
    const blog = await page.locator('[data-testid="blog-item"]', { hasText: `Title: ${title}` })
    await blog.getByRole('button', { name: 'View info' }).click()
    const userText = await blog.getByTestId('user-creator')

    await expect(userText).toBeVisible()

    const clean = await userText.textContent()
    const userCreator = clean
        .replace('Created by:', '')
        .trim()
        .toLowerCase()

    const deleteBtn = await blog.getByRole('button', { name: 'delete' })
    await expect(deleteBtn).toBeVisible()
    await expect(userCreator).toBe(userLogged)
    await page.once('dialog', async dialog => {
        await dialog.accept()
    })
    await deleteBtn.click()
}

export {
    loginWith,
    createBlog,
    editBlog,
    likeBlog,
    deleteBlog
}