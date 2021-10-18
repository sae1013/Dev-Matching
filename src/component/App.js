import Breadcrumb from "./Breadcrumb.js"
import Nodes from "./Nodes.js";
import {fetchData} from '../api/request.js';
import ImageView from "./ImageView.js";

function App($app) {

  this.state = {
    isRoot:false,
    nodes:[], // 현재폴더의 모든 노드
    depth:[], // 현재 폴더의 계층구조
    showModal: false,
    modalImagePath:null,
    
  }

  const keyDownEventListener = (e) => {
    if(e.key =="Escape"){
      this.setState({
        ...this.state,
        showModal:false
      })
    }
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
    },
    onClick: async (node) => {
      try{
        if (node.type === 'DIRECTORY') {// directory 인경우 파일로 접속
          //Breadcrumb를 업데이트 하고 fetch또한 새로
          const nextNodes = await fetchData(node.id) // 새로운 노드를 받아옴.
          this.setState({
            ...this.state,
            isRoot: nextNodes[0].parent ? false : true,
            depth:[...this.state.depth, node],  // 파일계층노드
            nodes: nextNodes, 
          })
          

        }else if(node.type ==='FILE'){ //file 인 경우 는 open
          this.setState({
            ...this.state,
            showModal:true,
            modalImagePath:node.filePath
          })

        }  
      }catch(err){
        // 비동기 혹은 이미지 에러 처리.
      }
      
    },
    onBackClick: async() => {
      try{
        const nextState = {...this.state}
        nextState.depth.pop();
        const prevNodeId = nextState.depth.length == 0 ? null : nextState.depth[nextState.depth.length-1].id;

        if(!prevNodeId){ // 이전 페이지가 root인경우
          const rootNodes = await fetchData();
          this.setState({
            ...nextState,
            isRoot:true,
            nodes:rootNodes
          })
        }else {
          const prevNodes = await fetchData(prevNodeId);
          this.setState({
            ...nextState,
            isRoot:false,
            nodes:prevNodes
          })
        }
      }catch(err){

      }


    }
  });
  
  const Imageview = new ImageView({ 
    $app,
    initialState: {modalImagePath:this.state.modalImagePath,showModal:this.state.showModal}
  });

  this.setState = (nextState) => {
    this.state = nextState // 상태값을 변화시킴
    breadcrumb.setState(this.state.depth); //컴포넌트업데이트
    nodes.setState({ // 컴포넌트 업데이트
      isRoot: this.state.isRoot,
      nodes: this.state.nodes
    })
    Imageview.setState({
      showModal: this.state.showModal,
      modalImagePath:this.state.modalImagePath
    });

    if(this.state.showModal){ // modal event
      window.addEventListener('keydown',keyDownEventListener);
    }else {
      window.removeEventListener('keydown',keyDownEventListener);
    }
  }
  
  const init = async() => {
    try {
      const rootNodes = await fetchData(); // 전체 결과가 처리되면 이자리 promise로 들어옴
      this.setState({
        ...this.state,
        isRoot:true, // 맨처음은 루트를 파싱
        nodes:rootNodes
      })
    } catch(e){
      // fetchData 수행중 에러 발생, promise에 error가 박혔을 때
    }
  }
  
  init() // 모두 로드 되지마자 fetch 수행
}

export default App
