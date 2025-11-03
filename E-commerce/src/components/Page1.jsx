import Container from '../Container';
import Page2 from './Page2';

const Page1 = () => {
  return (
    <>
      <section className="bg-[url(/Benner.jpg)] bg-cover bg-center bg-no-repeat w-full mobile:min-h-[50vh] ">
        <Container>
          <div className="flex items-center justify-between mobile:pt-10 computer:pt-[60px]">
            <div className="">
              <p className="text-[18px] font-display font-medium text-[#22351E]">
                Get up to -30% off on your purchase
              </p>
              <h1 className="mobile:text-[30px] tablet:text-[40px] laptop:text-[36px] computer:text-[60px] font-display font-bold text-[#22351E] mt-[10px] mb-[15px] mobile:w-full tablet:w-full laptop:w-[634px] computer:w-[634px]">
                Buy From Different Kind of Grocery Store
              </h1>
              <p className="text-[18px] font-display font-medium text-[#22351E]  mobile:mb-[80px] computer:mb-[40px] tablet:mb-[70px] laptop:mb-[30px]">
                Don't miss these opportunities...
              </p>
              <div className="flex items-center justify-between">
                <button className="mobile:text-[12px] tablet:text-[18px] laptop:text-[18px] computer:text-[18px] font-display font-bold text-[#FFF] bg-[#629D23] py-[12px] px-[24px] rounded-[8px] cursor-pointer hover:bg-[#22351E] ease-in-out duration-300">
                  Shop Now
                  <span className="ml-[12px]">
                    <i class="fa-regular fa-arrow-right"></i>
                  </span>
                </button>
                <div className="mobile:block tablet:block laptop:hidden computer:hidden">
                  <img className="w-[175px]" src="oppart.png" alt="oppart" />
                </div>
              </div>
            </div>
            <div className="mobile:hidden tablet:hidden laptop:block computer:block">
              <img src="oppart.png" alt="oppart" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Page1;
