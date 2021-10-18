import Breadcrumb from "./Breadcrumb.js"
import Nodes from "./Nodes.js";
import {fetchData} from '../api/request.js';

function App($app) {
  this.state = {
    isRoot:false,
    nodes:[], // 현재폴더의 모든 노드
    depth:[] // 현재 폴더의 계층구조
  }

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth
  });

  const nodes = new Nodes({
    $app,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
      onClick: (node) => {
        if (node.type === 'DIRECTORY') {// directory 인경우 파일로 접속
        

        }else if(node.type ==='FILE'){ //file 인 경우 는 open
        

        }
      }
    }
  });

  this.setState = (nextState) => {
    this.state = nextState // 상태값을 변화시킴
    breadcrumb.setState(this.state.depth); //컴포넌트업데이트
    nodes.setState({ // 컴포넌트 업데이트
      isRoot: this.state.isRoot,
      nodes: this.state.nodes
    })

  }
  
  const init = async() => {
    try {
      const rootNodes = await fetchData(); // 전체 결과가 처리되면 이자리 promise로 들어옴
      this.setState({
        ...this.state,
        isRoot:true,
        nodes:rootNodes
      })
    } catch(e){
      // fetchData 수행중 에러 발생, promise에 error가 박혔을 때
    }
  }
  
  init() // 모두 로드 되지마자 fetch 수행
}

export default App
