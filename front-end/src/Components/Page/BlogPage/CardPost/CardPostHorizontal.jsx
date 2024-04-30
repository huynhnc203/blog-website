import React from 'react';
import './CardPostHorizontal.css';

const blogpostcardhorizontal = () => {
  return (
    <>
    <div className="blogpostcardhorizontal mt-5">
      <div className="row">
        <div className="col-12">
          <article className="blog-card">
            <div className="blog-card__background">
              <div className="card__background--wrapper">
                <div className="card__background--main" style={{backgroundImage: "url('http://demo.yolotheme.com/html/motor/images/demo/demo_131.jpg')"}}>
                  <div className="card__background--layer"></div>
                </div>
              </div>
            </div>
            <div className="blog-card__head">
              <span className="date__box">
                <span className="date__day">11</span>
                <span className="date__month">JAN</span>
              </span>
            </div>
            <div className="blog-card__info">
              <h5>ĐÂY LÀ CHỖ ĐỂ TITLE</h5>
              <p>
                <a href="#" className="icon-link mr-3"><i className="fa fa-pencil-square-o"></i>Phuc dep trai</a>
              </p>
              <p>Phúc, với gương mặt đẹp trai và ánh mắt sâu thẳm, luôn tỏ ra lịch lãm và quyến rũ. Anh ta tỏa ra sự tự tin và sự thu hút tự nhiên khiến mọi người không thể rời mắt khỏi anh. Bên cạnh vẻ ngoài hấp dẫn, Phúc còn là người có tâm hồn đẹp và sự ấm áp trong cách giao tiếp, tạo nên sự gần gũi và dễ mến đối với mọi người xung quanh.</p>
              <a href="#" className="buttonreadmore"><i className="btn-icon fa fa-long-arrow-right"></i>READ MORE</a>
            </div>
          </article>
        </div>
      </div>
    </div>

    <section className="detail-page">
      <div className="container mt-5">
        
      </div>
    </section>

    </>
  );
}

export default blogpostcardhorizontal;
