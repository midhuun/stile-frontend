import { useEffect, useState } from "react";
import { Product } from "../../types/CategoryType";
import ProductCard from "./productCard";

const Suggestion = ({ subid, id }: any) => {
    const [suggestions, setSuggestions] = useState<Product[]>([]);

    useEffect(() => {
        let isMounted = true;
        const fetchSuggestions = async () => {
            try {
                const result = await fetch(`https://stile-backend.vercel.app/subcategoryProducts/${subid}`);
                const data = await result.json();
                if (isMounted) {
                    setSuggestions(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        };
        fetchSuggestions();

        return () => {
            isMounted = false;
        };
    }, [subid]); // Fetch suggestions whenever subid changes

    const suggestion: Product[] = suggestions
        .slice(0, 5)
        .filter((product) => product?.subcategory === subid && product._id !== id);

    return (
        <div className="w-full px-2 mt-5 md:px-6">
            <h2 className="md:text-lg py-4 font-bold uppercase text-md">You May Also Like</h2>
            <div className="flex overflow-x-scroll gap-1 md:gap-4">
                {suggestion.map((product) => (
                    <div key={product._id}>
                        <ProductCard product={{ ...product, type: "home" }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Suggestion;
