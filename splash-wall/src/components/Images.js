import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import { backendURL } from '../config';
import Image from './image';

const imageCount = 30;

const Images = () => {
    const [images, setImages] = useState([]);
    const [page, setPage] = useState(1);
    const [keyword, setKeyword] = useState('');
    const [searchTriggered, setSearchTriggered] = useState(false);

    useEffect(() => {
        Axios.get(`${backendURL}/api/photos?page=${page}&count=${imageCount}`)
        .then((res) => {
            setImages(res.data);
        });

        setPage(p => p+1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchLatestImages = () => {
        Axios.get(`${backendURL}/api/photos?page=${page}&count=${imageCount}`)
        .then((res)=>{
          setImages([...images, ...res.data]);
        });
      
        setPage( p => p + 1 );
    };

    const fetchSearchedImages = () => {
        Axios.get(
            `${backendURL}/api/photos/search?keyword=${keyword}&page=${page}&count=${imageCount}`
        ).then((res) => {
            setImages([...images, ...res.data.results]);
        });
        setPage((p) => p + 1);
    };

    const onSearchClick = () => {
        setPage(1);
        setSearchTriggered(true);
        setImages(_ => []);
        Axios.get(
            `${backendURL}/api/photos/search?keyword=${keyword}&page=${page}&count=${imageCount}`
        ).then((res) => {
            setImages(_ => res.data.results);
        });
    }

    return (
        <div>
            <input 
                type="text"
                value={keyword}
                onChange={(e) => {
                    setKeyword(e.target.value);
                }}
            />
            <button onClick={onSearchClick}>Search</button>
            <InfiniteScroll
                dataLength={images.length}
                next={searchTriggered ? fetchSearchedImages : fetchLatestImages}
                hasMore={true}
                loader={<h4>Loading...</h4>}
            >
                {
                    images.map((image) => (
                        <Image
                            url={image.urls.thumb}
                            key={image.id}
                            alt_description={image.alt_description}
                        />
                    ))
                }
            </InfiniteScroll>
        </div>
    );
}

export default Images;