
// 생성된 DOM 을 어디에 append 할지 $app파라미터로 받기.

function Nodes({$app,initialState}) {
  this.state = initialState // node 배열이 필요함.

  this.$target = document.createElement('ul'); // 어디에 렌더링할지
  $app.appendChild(this.$target);
  
  this.setState = (nextState) => { // 재 렌더링함수
    this.state = nextState
    this.render(); // 외부에서 setState를 호출하면 자동으로 렌더링까지 이어짐.
  }

  this.render = () => { // 현재 State기준으로 렌더링
    this.$target.innerHTML = this.state.nodes.map(node=>{
      return (
        `<li>${node.name}</li>`
      )
    })
  }
  
  this.render(); // 인스턴스화 되자마자 렌더링 되도록 한다. (첫 렌더링을 위해서)
}

export default Nodes

// 실제 컴포넌트가 인스턴스화 되는시점에 화면이 바로 처음 그려지고 이후 render함수 호출시점에
// 재렌더링 된다.