import{ useParams}  from 'react-router';
import {useState, useEffect} from 'react';
import type {God} from './../../types/god';
import {getGods} from '../../services/api';

export const GodDetail = () => {
  const {name} = useParams<{name:string}>();  //name:string tells typescript that route parameter is expected to be a string
  const [god, setGod] = useState<God | null>(null);  
  const[loading,setLoading] = useState<boolean>(false);
  const[error,setError] = useState<string>("");
  
  useEffect(()=>{
    const fetchGod = async()=>{
      setLoading(true);
      setError("");
      try{
      if(name){
        const response = await getGods(name);
        // const data = await response.json();
        setGod(response);
        
      }
      }catch(error){
        setError("Error while fetching god details");
      }finally{
        setLoading(false);
      }

    };
    fetchGod();
    
  }, [name]);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      GodDetail: {name}
      {god &&
      <>
       <h2>{god.name}</h2>
       <p>{god.description}</p>
       <p>{god.category}</p>
       <p>{god.role}</p>
       {god.powers.map((power, index) =>(
        <p key={index}>{power}</p>
       ))}
       {god.symbols.map((symbol,index) =>(
        <p key={index}>{symbol}</p>
       ))}
       {god.relationships.parents.map((relationship,index) => (
        <p key={index}>{relationship}</p>
       ))}
       {god.relationships.spouse.map((relationship,index) => (
        <p key={index}>{relationship}</p>
       ))}
       {god.relationships.children.map((relationship,index) => (
        <p key={index}>{relationship}</p>
       ))}
       {god.stories.map((story,index) => (
        <p key={index}>{story}</p>
       ))}
       {god.sources.map((source,index) => (
        <p key={index}>{source}</p>
       ))}       
       </>
       }

    </div>

  )
}
