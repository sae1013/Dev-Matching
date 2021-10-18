import Breadcrumb from "./Breadcrumb"
import Nodes from "./Nodes";

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
        if (node.type === 'DIRECTORY') {
          // directory 인경우 // 파일로 접속
        }else if(node.type ==='FILE'){
          //file 인 경우 는 open
        }
      }
    }
  });
}

export default App
