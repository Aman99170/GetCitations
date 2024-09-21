import { useCallback, useRef, useState } from "react"
import { IOrder } from "./type"

export const useResearchPapers = () => {
    const [allRPperPage, setAllRPperPage] = useState<IOrder[]>([])
    const [page,setPage] = useState<number>(1)
    const [rowsPerPage,setRowsPerPage] = useState<number>(10)
    const lastItemRef = useRef(null)
    const isFirstFetch = useRef(true)
    const loadMoreItems = () => {
        setTimeout(() => {
          setPage((prev) => prev + 1);
          isFirstFetch.current =true
        }, 1000); 
    };

    const observer = useRef(
        new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
              loadMoreItems()
            }
          },
          { threshold: 1 }
        )
      );
    
      const lastElementRef = useCallback(
        (node:any) => {
          if (observer.current) observer.current.disconnect();
          if (node) observer.current.observe(node);
        },
        [observer]
      )


    const fetchAllOrders = useCallback(async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getAllRP?page=${page}&roewPerPage=${rowsPerPage}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (res.status === 200) {
                setAllRPperPage(await res.json())
            }
        } catch (error) {
            console.error(error)
        }
    }, [page])

    return {
        page,
        rowsPerPage,
        allRPperPage,
        lastItemRef,
        isFirstFetch,
        setPage,
        setRowsPerPage,
        setAllRPperPage,
        fetchAllOrders,
        loadMoreItems,
        lastElementRef
    }
}