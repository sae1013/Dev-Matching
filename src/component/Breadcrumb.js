
function Breadcrumb({$app,initialState}) {
  this.state = initialState; // depth

  this.$target = document.createElement('nav');
  this.$target.className = 'Breadcrumb';
  $app.appendChild(this.$target) // 초기화코드

  this.setState = (nextState)=>{
    this.state = nextState // 상태업데이트
    this.render(); // 재렌더링
  }

  this.render = () => {
    this.$target.innerHTML = `<div class="nav-item">root</div>${
      this.state.map((node,index)=>`<div class="nav-item" id="${index}">${node.name}</div>`).join('')
    }`      
  }
  
  this.render(); // 생성하자마자 렌더링.
}

export default Breadcrumb
