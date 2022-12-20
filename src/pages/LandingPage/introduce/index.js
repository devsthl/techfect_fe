import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CardEvent from './CardEvent';
import './Introduce.scss';
import InvestmentFund from './InvestmentFund';
import Purpose from './PurposeIntro';
import ShoppingMall from './ShoppingMall';

function Introduce() {
    return (
        <div className="introduce-warpper">
            <div className="introduce-inner">
                <div className="purpose-wrap">
                    <Purpose />
                </div>
            </div>
            <div className="investment-funds">
                <h2>Quỹ đầu tư</h2>
                <div className="list-investment">
                    <InvestmentFund />
                    <InvestmentFund />
                    <InvestmentFund />
                    <InvestmentFund />
                </div>
                <button>
                    Xem thêm <FontAwesomeIcon icon={faArrowRightLong} />
                </button>
            </div>
            <div className="shopping-mall">
                <h2>Trung tâm thương mại</h2>
                <div className="list-shopping">
                    <ShoppingMall />
                    <ShoppingMall />
                    <ShoppingMall />
                    <ShoppingMall />
                </div>
                {/* <button>
                    Xem thêm <FontAwesomeIcon icon={faArrowRightLong} />
                </button> */}
            </div>
            <div className="event">
                <h2>Hoạt động, Sự kiện, Hội thảo</h2>
                <div className="list-event">
                    <CardEvent />
                    <CardEvent />
                    <CardEvent />
                </div>
            </div>
            {/* <div className="rotation">
                <div className="card">
                    <div className="card-side front">
                        <div>Front Side</div>
                    </div>
                    <div className="card-side back">
                        <div>Back Side</div>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default Introduce;
