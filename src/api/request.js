const API_END_POINT = 'https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev'

export const fetchData = async(nodeId) => {
  try {
    const response = await fetch(`${API_END_POINT}/${nodeId ? nodeId : ''}`);
    
    if(!response.ok) {
      throw new Error('server error');
    }
    const data = await response.json();
    
    return data; 
    
  }catch(err){
    throw new Error('something went wrong -> '+err.message);
  }
}

