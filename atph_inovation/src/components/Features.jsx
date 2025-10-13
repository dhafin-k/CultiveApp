import { ActivitySquareIcon, Palette , UserRound, Leaf, Gem, Earth, Sparkles } from "lucide-react";
import React from "react";

const Features = () => {
  return (
    <>
      <div className="bg-white flex flex-col items-center h-full max-w-full pt-[88px]">
        <>
          <div className="font-semibold text-4xl"> <h1>Features</h1></div>
        </>
        <></>
        <></>
        <>
          <div className="flex h-fit flex-wrap max-w-[1248px] mt-5">
            <div className="rounded-2xl bg-[#F1F1F1] bg-gradient-to-r p-6 w-[358px] h-[282px] overflow-clip ml-11 mt-9">
              <div
                className={
                  "w-full flex h-fit justify-start items-center gap-x-4"
                }>
                <div
                  className={
                    "bg-white w-16 h-16 rounded-xl flex items-center justify-center shrink-0 grow-0"
                  }> <UserRound
                    xmlns={"http://www.w3.org/2000/svg"}
                    width={24}
                    height={24}
                    viewBox={"0 0 24 24"}
                    fill={"none"}
                    stroke={"currentColor"}
                    strokeWidth={2}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    className={
                      "lucide lucide-square-activity lucide lucide-square-activity text-[#E85F00] w-8 h-8"
                    }></UserRound>
                </div>
                <div
                  className={"font-black text-[68px] text-[#E9E9E9] leading-[82px] w-[440px] shrink-0 grow-0"}
                  >
                 Users
                </div>
              </div>
              <div className={"text-[26px] font-semibold text-[#121212] mt-5"}>
                User Experience
              </div>
              <div className={"text-[#777777] mt-4 flex-col"}>
                Memberikan pengalaman terbaik bagi pengguna melalui desain yang intuitif dan kemudahan dalam setiap interaksi.
              </div>
            </div>
            <div className="rounded-2xl bg-[#F1F1F1] bg-gradient-to-r p-6 w-[358px] h-[282px] overflow-clip ml-11 mt-9">
              <div
                className={
                  "w-full flex h-fit justify-start items-center gap-x-4"
                }
              >
                <div
                  className={
                    "bg-white w-16 h-16 rounded-xl flex items-center justify-center shrink-0 grow-0"
                  }
                >
                  <Palette 
                    xmlns={"http://www.w3.org/2000/svg"}
                    width={24}
                    height={24}
                    viewBox={"0 0 24 24"}
                    fill={"none"}
                    stroke={"currentColor"}
                    strokeWidth={2}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    className={
                      "lucide lucide-square-activity w-8 h-8 text-[#0F0091]"
                    }
                  ></Palette >
                </div>
                <div
                  className={
                    "font-black text-[68px] text-[#E9E9E9] leading-[82px] w-[440px] shrink-0 grow-0"
                  }
                >
                  Modern
                </div>
              </div>
              <div className={"text-[26px] font-semibold text-[#121212] mt-5"}>
                Elegan dan Modern
              </div>
              <div className={"text-[#777777] mt-4 flex-col"}>
                Menghadirkan tampilan yang indah sekaligus fungsional untuk kenyamanan pengguna di setiap momen.
              </div>
            </div>
            <div className="rounded-2xl bg-[#F1F1F1] bg-gradient-to-r p-6 w-[358px] h-[282px] overflow-clip ml-11 mt-9">
              <div
                className={
                  "w-full flex h-fit justify-start items-center gap-x-4"
                }
              >
                <div
                  className={
                    "bg-white w-16 h-16 rounded-xl flex items-center justify-center shrink-0 grow-0"
                  }
                >
                  <Leaf 
                    xmlns={"http://www.w3.org/2000/svg"}
                    width={24}
                    height={24}
                    viewBox={"0 0 24 24"}
                    fill={"none"}
                    stroke={"currentColor"}
                    strokeWidth={2}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    className={
                      "lucide lucide-square-activity lucide lucide-square-activity w-8 h-8 text-[#09C272]"
                    }
                  ></Leaf >
                </div>
                <div
                  className={
                    "font-black text-[68px] text-[#E9E9E9] leading-[82px] w-[440px] shrink-0 grow-0"
                  }
                >
                  Natural
                </div>
              </div>
              <div className={"text-[26px] font-semibold text-[#121212] mt-5"}>
                Harmoni dalam Desain
              </div>
              <div className={"text-[#777777] mt-4 flex-col"}>
                Setiap elemen dirancang selaras untuk menciptakan keseimbangan antara keindahan dan fungsi.
              </div>
            </div>
            <div className="rounded-2xl bg-[#F1F1F1] bg-gradient-to-r p-6 w-[358px] h-[282px] overflow-clip ml-11 mt-9">
              <div
                className={
                  "w-full flex h-fit justify-start items-center gap-x-4"
                }
              >
                <div
                  className={
                    "bg-white w-16 h-16 rounded-xl flex items-center justify-center shrink-0 grow-0"
                  }
                >
                  <Earth 
                    xmlns={"http://www.w3.org/2000/svg"}
                    width={24}
                    height={24}
                    viewBox={"0 0 24 24"}
                    fill={"none"}
                    stroke={"currentColor"}
                    strokeWidth={2}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    className={
                      "lucide lucide-square-activity lucide lucide-square-activity w-8 h-8 text-[#7E0AC4]"
                    }
                  ></Earth >
                </div>
                <div
                  className={
                    "font-black text-[68px] text-[#E9E9E9] leading-[82px] w-[440px] shrink-0 grow-0"
                  }
                >
                  Friendly
                </div>
              </div>
              <div className={"text-[26px] font-semibold text-[#121212] mt-5"}>
                Inspiratif & Visioner
              </div>
              <div className={"text-[#777777] mt-4 flex-col"}>
                Diciptakan dengan tujuan untuk memberdayakan dan menginspirasi setiap pengguna.
              </div>
            </div>
            <div className="rounded-2xl bg-[#F1F1F1] bg-gradient-to-r p-6 w-[358px] h-[282px] overflow-clip ml-11 mt-9">
              <div
                className={
                  "w-full flex h-fit justify-start items-center gap-x-4"
                }
              >
                <div
                  className={
                    "bg-white w-16 h-16 rounded-xl flex items-center justify-center shrink-0 grow-0"
                  }
                >
                  <Gem 
                    xmlns={"http://www.w3.org/2000/svg"}
                    width={24}
                    height={24}
                    viewBox={"0 0 24 24"}
                    fill={"none"}
                    stroke={"currentColor"}
                    strokeWidth={2}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    className={
                      "lucide lucide-square-activity lucide lucide-square-activity w-8 h-8 text-[#1267D4]"
                    }
                  ></Gem >
                </div>
                <div
                  className={
                    "font-black text-[68px] text-[#E9E9E9] leading-[82px] w-[440px] shrink-0 grow-0"
                  }
                >
                  Design
                </div>
              </div>
              <div className={"text-[26px] font-semibold text-[#121212] mt-5"}>
                Detail dan Konsisten
              </div>
              <div className={"text-[#777777] mt-4 flex-col"}>
                Setiap elemen dibuat dengan ketelitian untuk memastikan pengalaman yang rapi, konsisten, dan menyenangkan.
              </div>
            </div>
            <div className="rounded-2xl bg-[#F1F1F1] bg-gradient-to-r p-6 w-[358px] h-[282px] overflow-clip ml-11 mt-9">
              <div
                className={
                  "w-full flex h-fit justify-start items-center gap-x-4"
                }
              >
                <div
                  className={
                    "bg-white w-16 h-16 rounded-xl flex items-center justify-center shrink-0 grow-0"
                  }
                >
                  <Sparkles 
                    xmlns={"http://www.w3.org/2000/svg"}
                    width={24}
                    height={24}
                    viewBox={"0 0 24 24"}
                    fill={"none"}
                    stroke={"currentColor"}
                    strokeWidth={2}
                    strokeLinecap={"round"}
                    strokeLinejoin={"round"}
                    className={
                      "lucide lucide-square-activity lucide lucide-square-activity w-8 h-8 text-[#BF1495]"
                    }
                  ></Sparkles >
                </div>
                <div
                  className={
                    "font-black text-[68px] text-[#E9E9E9] leading-[82px] w-[440px] shrink-0 grow-0"
                  }
                >
                  Adaptif
                </div>
              </div>
              <div className={"text-[26px] font-semibold text-[#121212] mt-5"}>
                Sederhana & Elegan
              </div>
              <div className={"text-[#777777] mt-4 flex-col"}>
                Menghubungkan manusia dan teknologi dengan cara yang lebih hangat.
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default Features;