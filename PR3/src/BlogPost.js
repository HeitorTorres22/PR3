import React, { useCallback, useState } from "react";
import ClayButton from "@clayui/button";
import ClayForm, { ClayInput } from "@clayui/form";


const BlogsPt = () => {

    const [blogs, setBlogs] = useState([]);
    const [headline, setHeadline] = useState("");
    const [articleBody, setArticleBody] = useState("");
    const [description, setDescription] = useState("");
    const [postId, setPostId] = useState('');
    const [idDelete, setIdDelete] = useState("");
    const siteId = Liferay.ThemeDisplay.getSiteGroupId();


    const getBlogs = useCallback(() => {
        Liferay.Util.fetch(`http://localhost:8080/o/headless-delivery/v1.0/sites/${siteId}/blog-postings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },

        })
            .then((res) => res.json())
            .then((res) => { setBlogs(res.items) });
    })

    const postBlogs = useCallback(() => {
        Liferay.Util.fetch(`http://localhost:8080/o/headless-delivery/v1.0/sites/${siteId}/blog-postings`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                headline: headline,
                articleBody: articleBody,
                description: description,
            })
        }).then(() => {
            setHeadline("")
            setArticleBody("")
            setDescription("")

        });
    }, [
        headline,
        articleBody,
        description
    ])



    const putBlogs = useCallback(() => {
        Liferay.Util.fetch(`http://localhost:8080/o/headless-delivery/v1.0/blog-postings/${postId}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    headline: headline,
                    articleBody: articleBody,
                    description: description,
                })
            }).then(() => {
                setHeadline("")
                setArticleBody("")
                setDescription("")

            });
    }, [
        headline,
        articleBody,
        description
    ])

    const deleteBlogs = useCallback(() => {
        Liferay.Util.fetch(`/o/headless-delivery/v1.0/blog-postings/${idDelete}`, {
            method: "DELETE",
        })
            .then(() => {
                setIdDelete("")
            })
    }, [
        idDelete,
    ]
    )

    return (
        <>
            <div style={{ fontSize: "35px", padding: "40px" }}>Blog Post:</div>
            <div style={{ padding: "40px", }}>
                {blogs.map(blog => (
                    <div key={blog.id}>
                        <h3>Headline:</h3> {blog.headline}
                        <br></br>
                        <b>ArticleBody:</b> {blog.articleBody}
                        <br></br>
                        <b>Description:</b> {blog.description}
                        <br></br>
                        <b>ID:</b> {blog.id}
                        <br></br><br></br>
                    </div>
                ))}

                <ClayButton style={{ marginRight: '20px', marginTop: '30px' }} onClick={() => getBlogs()}>Get</ClayButton>

                <ClayButton style={{ marginRight: '20px', marginTop: '30px' }} onClick={() => postBlogs()}>Post</ClayButton>

                <ClayButton style={{ marginRight: '20px', marginTop: '30px' }} onClick={() => putBlogs()}>Put</ClayButton><br></br><br></br>

                <ClayForm.Group>
                    <label
                        htmlFor="basicInputText">Headline</label>
                    <ClayInput
                        placeholder="insert your Headline"
                        id="basicInputText"
                        type="text"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)} />
                </ClayForm.Group>

                <ClayForm.Group>
                    <label
                        htmlFor="basicInputText">ArticleBody</label>
                    <ClayInput
                        placeholder="insert your ArticleBody"
                        id="basicInputText"
                        type="text"
                        value={articleBody}
                        onChange={(e) => setArticleBody(e.target.value)} />
                </ClayForm.Group>

                <ClayForm.Group>
                    <label
                        htmlFor="basicInputText">Description</label>
                    <ClayInput
                        placeholder="insert your Description"
                        id="basicInputText"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                </ClayForm.Group>

                <ClayForm.Group>
                    <label
                        htmlFor="basicInputText">Id</label>
                    <ClayInput
                        placeholder="insert your ID"
                        id="basicInputText"
                        type="text"
                        value={postId}
                        onChange={(e) => setPostId(e.target.value)} />
                </ClayForm.Group>


                <ClayButton style={{ marginRight: '20px', marginTop: '30px' }} onClick={() => deleteBlogs()}>Delete</ClayButton><br></br><br></br>

                <ClayForm.Group>
                    <label
                        htmlFor="basicInputText">Select Id</label>
                    <ClayInput
                        placeholder="insert your ID"
                        id="basicInputText"
                        type="text"
                        value={idDelete}
                        onChange={(e) => setIdDelete(e.target.value)} />
                </ClayForm.Group>


            </div>
        </>
    )
}
export default BlogsPt;

