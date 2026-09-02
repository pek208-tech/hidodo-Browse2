class GlobalNavmoBar extends HTMLElement {
  connectedCallback() {
    let title = this.getAttribute("title");

    this.innerHTML = `
      <div class="global-nav-bar-mo">
      <div class="gnb-container">
        <div class="group1">
          <span class="logo"></span>
        </div>
        <div class="group2">
          
          <input type="checkbox" id="menuicon">
          <label for="menuicon">
             <span></span>
             <span></span>
             <span></span>
          </label>
          <div class="sidebar">
            <div class="bar">
              <a href="#" target="_self">로그인</a>
              <a href="#" target="_self">회원가입</a>
            </div>
            <div class="menu-group">
              <div class="menu">
                <a href="#" target="_self">홈</a>
                <a href="#" target="_self">멤버십</a>
                <a href="#" target="_self">공지사항</a>
              </div>
              
              <!-- <div class="btn-group">
                <button>앱 다운로드<img src="src/assets/images/icons/download.svg" alt=""></button>
              <button class="btn rounded gray2">
                <span>남은학습기간</span>
                <span class="days">254일</span>
              </button>
              </div> -->
            </div>
          </div>
          <div class="black-back"></div>
        </div>
      </div>
    </div>`
    ;
  }
}

window.customElements.define("global-nav-bar-mo", GlobalNavmoBar);
