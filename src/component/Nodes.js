
// 생성된 DOM 을 어디에 append 할지 $app파라미터로 받기.

function Nodes({$app,initialState}) {
  this.state = initialState // node 배열이 필요함.
  this.onClick = initialState.onClick

  this.$target = document.createElement('ul'); // 어디에 렌더링할지
  this.$target.className="Nodes"
  $app.appendChild(this.$target); 
  
  this.setState = (nextState) => { // 재 렌더링함수
    this.state = nextState
    this.render(); // 외부에서 setState를 호출하면 자동으로 렌더링까지 이어짐.
  }

  this.render = () => { // 현재 State기준으로 렌더링 
    if (this.state.nodes.length>0){ //! >0 안넣으면 , true로 인식되서 초기에, undefined뜸 
      let nodeView;
      if(this.state.isRoot){
        nodeView = `<div class="Node"><img src="../../assets/prev.png"></div>`
      }
      nodeView = nodeView + this.state.nodes.map(node => {
        const iconPath = node.type === 'FILE' ? '../../assets/file.png' : '../../assets/directory.png';
        
        return `
          <div class ="Node" id= "${node.id}">
            <img id= "${node.id}" src="${iconPath}"/> 
            <div>${node.name}</div>
          </div>
        `
      }).join('');
      
      this.$target.innerHTML = nodeView 
      // 렌더링 이후이벤트 달기
      this.$target.querySelectorAll('.Node').forEach(($node)=>{ 
        $node.addEventListener('click',(e)=>{
          e.stopPropagation();
          
          const nodeId = e.target.id
          const selectedNode = this.state.nodes.find(node => node.id === nodeId);
          
          if(selectedNode){ // 현재 선택한 노드를 onclick으로 넘겨주는 함수
            this.onClick(selectedNode);
            
          }
        })

      })
    } // data > 0 일때만.

  } // 렌더함수 끝
  
  this.render(); // 인스턴스화 되자마자 렌더링 되도록 한다. (첫 렌더링을 위해서)
}

export default Nodes

// 실제 컴포넌트가 인스턴스화 되는시점에 화면이 바로 처음 그려지고 이후 render함수 호출시점에
// 재렌더링 된다.

//질문 : isRoot 는 무엇을 위해 존재하는가 ? -> root이면 이전 파일을 표시하지않고, root가아니면 뒤로가기 클릭해야함