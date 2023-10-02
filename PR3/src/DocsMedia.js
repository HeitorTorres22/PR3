import React, { useCallback, useState } from 'react';
import ClayForm, { ClayInput } from '@clayui/form';
import ClayButton from '@clayui/button';


const DocMedia = () => {

	const [docs, setDocs] = useState([]);
	const [docsId, setDocsId] = useState("");
	const [postDocs, setpostDocs] = useState("");
	const [deledeId, setdeleteId] = useState("");
	const siteId = Liferay.ThemeDisplay.getSiteGroupId();

	const postDocsM = useCallback(() => {
		const formData = new FormData();
		const fileField = document.getElementById('inp');
		formData.append('file', fileField.files[0]);
		Liferay.Util.fetch(`/o/headless-delivery/v1.0/sites/${siteId}/documents`, {
			method: "POST", body: formData
		}
		);
	})


	const getDocsM = useCallback(() => {
		Liferay.Util.fetch(`/o/headless-delivery/v1.0/sites/${siteId}/documents`)
			.then(res => res.json())
			.then(data => setDocs(data.items));
	})


	const putDocsM = useCallback(() => {
		const formData = new FormData();
		const fileField = document.getElementById("#fileInputPut");

		formData.append('file', fileField.files[0]);
		Liferay.Util.fetch(`http://localhost:8080/o/headless-delivery/v1.0/documents/${postDocs}`, {
			method: "PUT",
			body: formData

		}).then(() => {
			setDocsId("")
			setpostDocs("")
		});
	}, [
		docsId,
		postDocs,
	])


	const deleteDocsM = useCallback(() => {
		Liferay.Util.fetch(`http://localhost:8080/o/headless-delivery/v1.0/documents/${deledeId}`,
			{ method: "DELETE", }
		).then(() => setdeleteId(""))
	});



	return (
		<>
			<div style={{fontSize: "35px", padding:"40px"}}>Documents and Media:</div>
			<div style={{ padding: "40px",}}>
				{docs.map(doc => (
					<div key={doc.id}>
						{doc.id} {doc.title}

					</div>
				))}

				<ClayButton onClick={() => getDocsM()} style={{ marginRight: '20px', marginTop: '30px' }} displayType="primary" >Get</ClayButton><br></br>

				<ClayButton onClick={() => postDocsM()} style={{ marginRight: '20px', marginTop: '30px' }} displayType="primary" >Post</ClayButton><br></br>

				<input type='file' id='inp' style={{ marginRight: '20px', marginTop: '10px' }}></input><br></br>

				<ClayButton onClick={() => putDocsM()} style={{ marginRight: '20px', marginTop: '30px' }} displayType="primary" >Put</ClayButton><br></br><input type='file' id="#fileInputPut" style={{ marginRight: '20px', marginTop: '10px' }}></input><br></br>

				<ClayForm.Group>
					<label htmlFor="basicInputText">Id</label>
					<ClayInput
						id="fileInputPut"
						onChange={e => setpostDocs(e.target.value)}
						placeholder="Enter the id here"
						type="text"
						value={postDocs}
					/>
				</ClayForm.Group>

				<ClayButton onClick={() => deleteDocsM()} style={{ marginRight: '20px', marginTop: '2px' }} displayType="primary" >Delete</ClayButton><br></br>

				<ClayForm.Group>
					<label htmlFor="basicInputText">Id</label>
					<ClayInput
						id="basicInputText"
						onChange={e => setdeleteId(e.target.value)}
						placeholder="Enter the id here"
						type="text"
						value={deledeId}
					/>
				</ClayForm.Group>

			</div>
		</>
	);
}

export default DocMedia;