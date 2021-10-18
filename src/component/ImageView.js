const BASE_IMAGE_PATH = 'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

function ImageView({$app,initialState}) {
  this.state = initialState // modalImagePath, showModal
  this.$target = document.createElement('div');
  this.$target.className = 'Modal ImageView'

  $app.appendChild(this.$target) // app의 자식에 추가.

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  }
  
  this.render = () => {
    this.$target.innerHTML = `<div class="content">${this.state.showModal ? `<img src="${BASE_IMAGE_PATH}${this.state.modalImagePath}">` :''}</div>`;   
    this.$target.style.display = this.state.showModal ? 'block' : 'none';    
  }

  this.render();
}

export default ImageView
