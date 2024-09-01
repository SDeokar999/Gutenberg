import React from 'react'
import { useNavigate } from 'react-router-dom';
import Next from './assets/Next.svg';
import {books} from './Books_constants'


function Home({ onClickEvent }) {
    const navigate = useNavigate();
    const handleClick = (type) => {
        onClickEvent(type)
        navigate('/books')
    }

    return (
        <>
            <div class=" grid bg-Pattern min-h-[250px] w-full sm:grid-cols-12 flex flex-col items-center justify-center p-10">
                <div class="font-montserrat text-[36px] md:text-[48px] font-semibold text-[#5E56E7] sm:col-span-3" >
                </div>
                <div class="sm:col-span-6">
                <div class="font-montserrat text-[36px] md:text-[48px] font-semibold text-[#5E56E7]" >
                    Gutenberg Project
                </div>
                <div class="font-montserrat text-[14px] md:text-[16px] " >
                    A social cataloging website that allows you to freely search its database of books, annotations, and reviews
                </div>
                </div>
                <div class="font-montserrat text-[36px] md:text-[48px] font-semibold text-[#5E56E7] sm:col-span-3" >
                </div>
            </div>
            <div class=" grid w-full sm:grid-cols-12 flex  p-5">
                <div class="sm:col-span-3" >
                </div>
                <div class="sm:col-span-6" >
                <div class="grid gap-4 m-2 sm:grid-cols-2 ">
                    {books?.map((book, key) => (
                        <div class="grid gap-4 p-4 min-h-[45px] rounded bg-white shadow-custom flex items-center grid-cols-12 cursor-pointer w-full" key={key} onClick={() => handleClick(book.title)}>
                            <div class="col-span-2 flex items-center justify-center">
                                <img src={book.image} alt="category-icon" class="h-[20px]" />
                            </div>
                            <div class="col-span-8 font-montserrat text-[18px] md:text-[15px]  font-semibold">
                                {book.name}
                            </div>
                            <div class="col-span-2 flex items-center justify-center">
                                <img src={Next} alt="next-icon" class="h-[15px]" />
                            </div>
                        </div>
                    ))}
                </div>
                </div>
                <div class=" sm:col-span-3" >
                </div>
            </div>
        </>
    )
}

export default Home