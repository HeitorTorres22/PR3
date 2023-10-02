import React, { useState, useCallback } from "react";
import ClayButton from "@clayui/button";
import ClayForm, { ClayInput } from "@clayui/form";


const KnowledBase = () => {


    const [folders, setFolders] = useState([]);
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [articleBody, setArticleBody] = useState('');
    const [article, setArticle] = useState([]);
    const [idArticle, setIdArticle] = useState('');
    const [foldersId, setFoldersId] = useState('');
    const siteId = Liferay.ThemeDisplay.getSiteGroupId();

   

    // Knowledge Folder

    const getKdFolder = useCallback(() => {
         return Liferay.Util.fetch(`/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-folders`, {
            method: 'GET'

         })
            .then((res) => res.json())
            .then((data) => setFolders(data.items));

    }, [folders]);


    const postKdFolder = useCallback(() => {
        return Liferay.Util.fetch(`/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-folders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name }),
        }
        ).then(() => {
            setName('');
        });
    }, [name]);


    const putKdFolder = useCallback(() => {
        return Liferay.Util.fetch("/o/headless-delivery/v1.0/knowledge-base-folders/" + foldersId, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name }),
        }
        ).then(() => {
            setName('');
        });
    }, [foldersId, name]);


    const delKdFolder = useCallback(() => {
        Liferay.Util.fetch(`/o/headless-delivery/v1.0/knowledge-base-folders/${foldersId}`,
            { method: 'DELETE' }
        ).then(() => setFoldersId(''));
    }, [foldersId]);

    // Knowledge Article

    const getKdArticle = useCallback(() => {
        Liferay.Util.fetch(`/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-articles`)
            .then((res) => res.json())
            .then((data) => setArticle(data.items));
    }, [article]);

    const postKdArticle = useCallback(() => {
        Liferay.Util.fetch(`/o/headless-delivery/v1.0/sites/${siteId}/knowledge-base-articles`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: title, articleBody: articleBody }),
        }
        ).then(() => {
            setTitle('');
            setArticleBody('');
        });
    }, [title, articleBody]);

    const putKdArticle = useCallback(() => {
        Liferay.Util.fetch(`/o/headless-delivery/v1.0/knowledge-base-articles/${idArticle}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: title, articleBody: articleBody }),

        }
        ).then(() => {
            setTitle('');
            setArticleBody('');
            setIdArticle('')
        });
    }, [idArticle, title, articleBody]);

    const delKdArticle = useCallback(() => {
        Liferay.Util.fetch(`/o/headless-delivery/v1.0/knowledge-base-articles/${idArticle}`, { method: 'DELETE' })
            .then(() => setIdArticle(''));
    }, [idArticle]);

    return (
        <>
            <div style={{ fontSize: "35px", padding: "40px" }}>Knowledge Base:</div>
           <div style={{ padding: "40px",}}>
                <h1>
                    Folder:
                </h1>
                {folders.map(folder => (
                    <div key={folder.id}>
                        {folder.id} {folder.name}

                    </div>
                ))}

                <ClayButton style={{ marginRight: '20px', marginTop: '30px' }} onClick={() => getKdFolder()}>Get</ClayButton>

                <ClayButton style={{ marginRight: '20px', marginTop: '30px' }} onClick={() => postKdFolder()}>Post</ClayButton>

                <ClayButton style={{ marginRight: '20px', marginTop: '30px' }} onClick={() => putKdFolder()}>Put</ClayButton>

                <ClayButton style={{ marginRight: '20px', marginTop: '30px' }} onClick={() => delKdFolder()}>Delete</ClayButton><br></br><br></br>

                <ClayForm.Group>
                    <label
                        htmlFor="basicInputText">Folder Name</label>
                    <ClayInput
                        placeholder="Enter your name here"
                        id="basicInputText"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} />
                </ClayForm.Group>

                <ClayForm.Group>
                    <label
                        htmlFor="basicInputText">Folder Id</label>
                    <ClayInput
                        placeholder="Enter your id here"
                        id="basicInputText"
                        type="text"
                        value={foldersId}
                        onChange={(e) => setFoldersId(e.target.value)} />
                </ClayForm.Group>

                <h1>
                    Article:
                </h1>
                {article.map(article2 => (
                    <div key={article2.id}>
                        {article2.id} {article2.name}

                    </div>
                ))}

                <ClayButton style={{ marginRight: '20px', marginTop: '30px' }} onClick={() => getKdArticle()}>Get</ClayButton>

                <ClayButton style={{ marginRight: '20px', marginTop: '30px' }} onClick={() => postKdArticle()}>Post</ClayButton>

                <ClayButton style={{ marginRight: '20px', marginTop: '30px' }} onClick={() => putKdArticle()}>Put</ClayButton>

                <ClayButton style={{ marginRight: '20px', marginTop:'30px' }} onClick={()=> delKdArticle()}>Delete</ClayButton>

                <ClayForm.Group>
                    <label
                        htmlFor="basicInputText">Title</label>
                    <ClayInput
                        placeholder="Enter the title here"
                        id="basicInputText"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </ClayForm.Group>

                <ClayForm.Group>
                    <label
                        htmlFor="basicInputText">Article Body</label>
                    <ClayInput
                        placeholder="Enter the article body here"
                        id="basicInputText"
                        type="text"
                        value={articleBody}
                        onChange={(e) => setArticleBody(e.target.value)} />
                </ClayForm.Group>

                <ClayForm.Group>
                    <label
                        htmlFor="basicInputText">Article Id</label>
                    <ClayInput
                        placeholder="Enter your id here"
                        id="basicInputText"
                        type="text"
                        value={idArticle}
                        onChange={(e) => setIdArticle(e.target.value)} />
                </ClayForm.Group>


            </div>
        </>
    );
}

export default KnowledBase;