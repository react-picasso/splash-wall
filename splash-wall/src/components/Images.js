import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { backendURL } from '../config';
import Image from './image';

const Images = () => {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        Axios.get(`${backendURL}/api/photos?page=${page}&count=${30}`)
        .then((res) => {
            setImages(res.data);
        })

        setPage(p => p+1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchImages = () => {
        Axios.get(`${backendURL}/api/photos?page=${page}&count=${30}`)
        .then((res)=>{
          setImages([...images, ...res.data]);
        })
      
        setPage( p => p + 1 );
    }

    console.log('images', images);

    return (
        <div>
            <InfiniteScroll
                dataLength={images.length}
                next={fetchImages}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                {
                    images.map((image) => (
                        <Image
                            url={image.urls.thumb}
                            alt_description={image.alt_description}
                        />
                    ))
                }
            </InfiniteScroll>
        </div>
    );
}

export default Images;