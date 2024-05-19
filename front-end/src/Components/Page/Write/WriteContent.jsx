import React from "react";
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './WriteContent.css';
import { Container, Form } from "react-bootstrap";
import { URL_LINK } from "../../Config";
<link href="https://cdn.jsdelivr.net/npm/quill@2.0.1/dist/quill.snow.css" rel="stylesheet" />



const WriteContent = () => {
  const [value, setValue] = useState('');
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [preview, setPreview] = useState(false);
  
  const URL = URL_LINK + "/api/posts"

  const makeRequestForAddPost = async () => {
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
            'title': title,
            'subtitle': subtitle,
            'body': value,
            })
      };
      const response = await fetch(URL, options);
      const result = await response.json();
    }

  const handlePreview = () =>{
    setPreview(true)
  }

  const handdleSave =()=>{
    const datapost = {
        "title": title,
        "subtitle": subtitle,
        "body": value,
    }
    localStorage.setItem('data', JSON.stringify(datapost));
  }

      
  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  };

    return (
        <>
        {!preview ? (
            <>
        <div className="input__write">
        <div className="input__Title">
        <Container>
            <Form.Control className="inputtitle"  placeholder="Enter the post title" value = {title} onChange={e => setTitle(e.target.value)} />
        </Container>
        </div>
        <div className="input__Tag">
            <Container>
                <Form.Control className="inputtag"  placeholder="Enter the tag" value = {tag} onChange= {e => setTag(e.target.value)} />
            </Container>
        </div>

        <div className="input__Subtitle">
        <Container>
            <Form.Control className="inputsubtitle"  placeholder="Enter the Subtitle" value = {subtitle} onChange={e => setSubtitle(e.target.value)}/>
        </Container>
        </div>


        <p>Description: </p>
        <div className="quill__Container">
        <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules}/>
        </div>
        </div>

        <div className = "nut">
            <button className="preview" onClick={handlePreview}>Preview</button>
            <button className= "post" onClick={makeRequestForAddPost}>Post</button>
            <button className="save" onClick={handdleSave} >Save</button>
        </div>
        </>
        )
        : 
        (
            <div className="preview__write">
                <div className="preview__Title">
                    <h1>{title}</h1>
                </div>
                <div className="preview__Tag">
                    <h3>{tag}</h3>
                </div>
                <div className = "preview_Subtitle">
                    <p>{subtitle}</p>
                </div>
                <div className="preview__Content">
                    <div dangerouslySetInnerHTML={{__html: value}}></div>
                </div>
                <div>
                    <button onClick={() => setPreview(false)}>Edit</button>
                </div>
            </div>
        )
        
    }
        </>
    )
}
export default WriteContent;