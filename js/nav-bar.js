class GlobalNavBar extends HTMLElement {
  connectedCallback() {
    let title = this.getAttribute("title");

    this.innerHTML = `
    <div class="global-nav-bar">
      <div class="gnb-container">
        <div class="group1">
          <span class="logo"></span>
        </div>
        <div class="group2">
          <div class="gnb-item">
            <a href="">멤버십</a>
          </div>
          <div class="gnb-item">
            <a href="">이용안내</a>
          </div>
          <div class="gnb-item">
            <a href="">공지사항</a>
          </div>
        </div>
        <div class="group3">
          <span>
            <a href="" id="logIn" class="link dark">로그인</a>
            <a href="" id="SignUp" class="link dark">회원가입</a>
          </span>

          <a href="" id="logOut" class="link dark d-none">로그아웃</a>

          <div class="btn-group">
            <button type="button" class="btn rounded purple app-download">
              앱 다운로드
            </button>
          </div>
        </div>
      </div>
    </div>`
    ;
  }
}

window.customElements.define("global-nav-bar", GlobalNavBar);
