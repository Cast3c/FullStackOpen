const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, editBlog, likeBlog, deleteBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
        await request.post('http://localhost:3003/api/testing/reset')
        const users = [
                {
                    name: 'Matti Luukkainen',
                    username: 'mluukkai',
                    password: '123456'
                },
                {
                    name:  'Admin tester',
                    username: 'Tester',
                    password: '654321'
                }
            ]

        for(const user of users){
           await request.post('http://localhost:3003/api/users', {data: user})
        }

        await page.goto('http://localhost:5173', {
            waitUntil: 'domcontentloaded',
            timeout: 240000
        })
    })

    test('Login form is show', async ({ page }) => {
        const usernameBox = await page.getByTestId('username')
        const passwordBox = await page.getByTestId('password')
        await expect(usernameBox).toBeVisible()
        await expect(passwordBox).toBeVisible()
    })

    describe('Login', () => {
        test('fails with wrong credentials', async ({ page }) => {
            await loginWith(page, 'mluukkai', 'wrong')
            const errorDiv = await page.getByTestId('notification')
            await expect(errorDiv).toContainText('Wrong credentials')
        })

        test('succeeds with correct credentials', async ({ page }) => {
            await loginWith(page, 'mluukkai', '123456')
            const msgDiv = await page.getByTestId('notification')
            await expect(msgDiv).toContainText(`Welcome, 'Matti Luukkainen'`)
            await expect(page.getByText('Matti Luukkainen Logged - in')).toBeVisible()
        })
    })

    describe('When logged in', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'mluukkai', '123456')
        })

        test('a new blog can be created', async ({ page }) =>{
            await createBlog(page, 'Test Blog by Playwright', 'Playwright', 'http://playwright.dev')
            await expect(page.getByTestId('blog-item').getByText('Test Blog by Playwright')).toBeVisible()
        })

        test('user can like a blog', async ({ page }) => {
            await createBlog(page, 'Like test blog', 'Tester', 'http://testblog.com' )
            await editBlog(page, 'Like test blog')
        })

        test('same user logged/creator can delete the blog', async({ page }) => {
            await createBlog(page, 'User can delete', 'Tester', 'http://testblog.com' )
            const userLogged = await page.getByText('Logged - in').textContent()
            const userName = userLogged
                .replace('Logged - in', '')
                .trim()
                .toLowerCase()
            await expect(userName).toBe('matti luukkainen')
            await deleteBlog(page, 'User can delete', userName)
        })
    })

    describe('Correct user options', () => {
        beforeEach(async ({ page }) =>{
            await loginWith(page, 'mluukkai', '123456')
            const blogs = [
                { title: 'Blog 1', author:'Tester1', url:'http://blog1.com'},
                { title: 'Blog 2', author:'Tester2', url:'http://blog2.com'},
                { title: 'Blog 3', author:'Tester3', url:'http://blog3.com'}
            ]

            for(const blog of blogs){
                await createBlog(page, blog.title, blog.author, blog.url)
            }
        })

        test(`Wrong user can't delete`, async ({ page }) => {
            await expect(page.getByText('Title: Blog 3')).toBeVisible()
            await expect(page.getByRole('button', { name: 'Log out' })).toBeVisible()
            await page.getByRole('button', { name: 'Log out' }).click()
            await loginWith(page, 'Tester', '654321')
            const msgDiv = await page.getByTestId('notification')
            await expect(msgDiv).toContainText(`Welcome, 'Admin tester'`)
            await expect(page.getByText('Admin tester Logged - in')).toBeVisible()
            await expect(page.getByRole('button', { name: 'delete' })).not.toBeVisible()
        })

    })

    describe('Blogs are sorted', () => {
        beforeEach(async ({ page }) => {
            await loginWith(page, 'mluukkai', '123456')
            const blogs = [
                { title: 'Blog 1', author:'Tester1', url:'http://blog1.com'},
                { title: 'Blog 2', author:'Tester2', url:'http://blog2.com'},
                { title: 'Blog 3', author:'Tester3', url:'http://blog3.com'}
            ]

            for(const blog of blogs){
                await createBlog(page, blog.title, blog.author, blog.url)
            }

        })

        test('Sorted blogs', async ({ page })=> {
            const edits = [
                {title: 'Blog 1', like: 5},
                {title: 'Blog 2', like: 2},
                {title: 'Blog 3', like: 10}
            ]

            for(const edit of edits){
                await likeBlog(page, edit.title, edit.like)
            }
        })
    })

})