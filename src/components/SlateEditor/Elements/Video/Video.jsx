import React, {useEffect, useState} from 'react'

import "./Video.css";

const Image = ({ attributes, element, children }) => {

    const {url,width,height} = element;
  const [youtubeURL, setYoutubeURL] = useState(null);
  useEffect(() => {
    if (url.includes('youtube')) {
      const youtubeID = url.split('v=')[1];
      setYoutubeURL(`https://www.youtube.com/embed/${youtubeID}`);
    }
  }, []);

  return (
    <div
      {...attributes}
      className='element-video'
      style={{display:'flex',justifyContent:'center'}}
    >
      <div contentEditable={false} style={{width:width,height:height}}>
        <div className='video-wrapper'>
        <iframe src={youtubeURL ? youtubeURL : url}  height={height} width={width} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
      </div>
      {children}
    </div>
  );
};
export default Image;
