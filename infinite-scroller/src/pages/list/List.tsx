import React, { useState } from 'react'
import { useInView } from 'react-intersection-observer';

export default function List():JSX.Element {
    const [ref, inView] = useInView();
    const [page, setPage] = useState(0);
    const [products, setProducts] = useState<string[]>([]);

    const repeat = () => {
        const repeatHello :string[] = Array(300).fill('hello');
        setProducts(repeatHello);
    }

    return (
        <>
            <button onClick={repeat}>click</button>
            {products?.map((a) => { return <div>{a}</div>})}
            <div>List</div>
        </>
  )
}
