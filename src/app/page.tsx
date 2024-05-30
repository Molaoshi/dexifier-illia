import Header from "@/components/header";
import Footer from "@/components/footer";
import Section from "@/components/section";
import DexifierWidget from "@/components/dexifier-widget";
import styles from "@/styles/home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Section>
        <Header />
        <div className={styles.sectionHome}>
          <div id="home1" className="z-[1] relative">
            <div className={styles.textVideoTitle}>First Time on Dexifier?</div>
            <div className={"my-2 " + styles.textVideoSubtitle}>
              How to swap tutorial
            </div>
            <div className="flex">
              <iframe
                className="home1Video max-w-full"
                width={365}
                height={200}
                src="https://www.youtube.com/embed/RL5QxNDKK2c"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
          <div id="home2" className="relative z-[2]">
            <div className="hidden sm:flex min-h-[540px] relative">
              <DexifierWidget />
            </div>
          </div>
          <div id="home3" className="relative ">
            <div className="home3Div w-[100%] max-w-[360px] h-[300px] ml-auto mt-auto absolute top-[105px] right-0">
              <div className="absolute w-full right-[0] bottom-[0px]">
                <div className="absolute w-[25%] top-[-15%] left-[5%]">
                  <img src="1.gif" className="rotate-[120deg]" alt="gif1" />
                </div>
                <div className="relative z-[1]">
                  <img src="2.gif" className="" alt="gif2" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      {/* Exchange Section */}
      <Section>
        <div id="AboutUs" className={styles.sectionExchange}>
          <div
            className={`text-center col-span-2 ${styles.textSectionTitle48}`}
          >
            <span className={styles.textHighlight}>Easy</span> & Infinite
            Exchange routes
          </div>
          <div className="flex items-center">
            <img src="exchange.png" alt="exchange" />
          </div>
          <div className={styles.textExchange}>
            We automatically find the fastest & cheapest trade routes for you.{" "}
            <br />
            <br />
            With 50+ Blockchains supported, and 1000s of coins, there are no
            limits to what you can trade.
          </div>
        </div>
      </Section>
      {/* Privacy Section */}
      <Section>
        <div className={styles.sectionPrivacy}>
          <div className={styles.textSectionTitle48}>
            <span className={styles.textHighlight}>Privacy</span> comes first
          </div>
          <div className={styles.textSectionContent}>
            <div className="text-justify">
              At Dexifier, we believe in the unalienable right to privacy and
              freedom in the financial world. In a landscape cluttered with
              mandatory sign-ups and invasive KYC checks, we stand apart.
              Dexifier is your gateway to a decentralized exchange experience
              that fiercely protects your anonimity and financial privacy.
            </div>
          </div>
          <div className={"font-bold " + styles.textSectionContent}>
            No Logins, No Cookies, No KYC -- EVER.
          </div>
          <div className={styles.sectionPrivacyCards}>
            <div className={styles.cardPrivacy}>NO logins/ signups</div>
            <div className={styles.cardPrivacy}>No cookies</div>
            <div className={styles.cardPrivacy}>NO kyc</div>
          </div>
        </div>
      </Section>
      {/* Pair Section */}
      {/* We'll make this part available when it's ready. */}
      {/* <Section>
        <div className={styles.sectionPair}>
          <div className={"text-center " + styles.textSectionTitle40}>
            <span className={styles.textHighlight}>Frequently</span> traded pairs
          </div>
          <div className={"mt-[60px] gap-[20px]" + styles.sectionPairContent}>
            <div className={"grid gap-[30px] underline font-bold text-center " + styles.textSectionContent}>
              <a href="#">ETH to BTC</a>
              <a href="#">LTC to ETH</a>
              <a href="#">USDT to BTC</a>
              <a href="#">BTC to XRP</a>
              <a href="#">BTC to USDT</a>
              <a href="#">ETH to BTC LTC to ETH</a>
            </div>
            <div className={"grid gap-[30px] underline font-bold text-center " + styles.textSectionContent}>
              <a href="#">ETH to BTC</a>
              <a href="#">LTC to ETH</a>
              <a href="#">USDT to BTC</a>
              <a href="#">BTC to XRP</a>
              <a href="#">BTC to USDT</a>
              <a href="#">ETH to BTC LTC to ETH</a>
            </div>
            <div className={"grid gap-[30px] underline font-bold text-center " + styles.textSectionContent}>
              <a href="#">ETH to BTC</a>
              <a href="#">LTC to ETH</a>
              <a href="#">USDT to BTC</a>
              <a href="#">BTC to XRP</a>
              <a href="#">BTC to USDT</a>
              <a href="#">ETH to BTC LTC to ETH</a>
            </div>
          </div>
        </div>
      </Section> */}
      {/* Customer Section */}
      <Section>
        <div className={styles.sectionCustomer}>
          <div className={styles.sectionCustomerL}>
            <div className={styles.textSectionTitle40}>
              <span className={styles.textHighlight}>24/7</span> Customer
              Support
            </div>
            <div className={"mt-[40px] " + styles.textSectionContent}>
              Having trouble with a swap? Head to our Discord, open a ticket or
              ask a question. Our international team & community are ready to
              help, around the clock.
            </div>
            <div className="flex mt-[80px] ">
              <Link href=" https://discord.gg/k6SPTtYWvY" target="_blank">
                <div className={styles.buttonJoin}>Join Discord</div>
              </Link>
            </div>
          </div>
          <div className={"flex items-center " + styles.sectionCustomerR}>
            <img src="customer.png" alt="customer" />
          </div>
        </div>
      </Section>
      {/* Wallets Section */}
      <Section>
        <div className={styles.sectionWallets}>
          <div
            className={`${styles.sectionWalletL} ${styles.textSectionTitle40}`}
          >
            <span className={styles.textHighlight}>Wallets</span> & Projects
            supported
            <img className="mt-[80px] mx-auto" src="wallet.png" alt="wallet" />
          </div>
          <div
            className={"wallets " + styles.sectionWalletR}
            style={{ gridAutoRows: "120px" }}
          >
            <div className="bg-white">
              <img src="wallets/xdefi.jpg" alt="xdefi" />
            </div>
            <div className="bg-white">
              <img src="wallets/metamask.jpg" alt="metamask" />
            </div>
            <div className="bg-white">
              <img src="wallets/phantom.jpg" alt="phantom" />
            </div>
            <div className="bg-white">
              <img src="wallets/keplr.jpg" alt="keplr" />
            </div>
            <div className="bg-white">
              <img src="wallets/tronlink.png" alt="tronlink" />
            </div>
            <div className="bg-white">
              <img src="wallets/apptopia.png" alt="apptopia" />
            </div>
            <div>
              <img src="wallets/rango.png" alt="rango" />
            </div>
            <div>
              <img src="wallets/thor.png" alt="thor" />
            </div>
            <div>
              <img src="wallets/maya.png" alt="maya" />
            </div>
            <div>
              <img src="wallets/1inch.svg" alt="1inch" />
            </div>
            <div>
              <img src="wallets/across.png" alt="across" />
            </div>
            <div className={styles.textIconText}>Many More...</div>
          </div>
        </div>
      </Section>
      {/* Community Section */}
      <Section>
        <div className={styles.sectionCommunity}>
          <div className="relative z-[1] flex flex-col">
            <div className={styles.textCommunity}>
              <span className={styles.textHighlight}>Join</span> Our Community!
            </div>
            <div className={`mt-[60px] ${styles.textSectionContent}`}>
              Discover the latest insights on Discord, engage with fellow crypto
              enthusiasts on Telegram, follow our pulse on Twitter, catch our
              informative and entertaining videos on YouTube.
            </div>
            <div
              className={
                "mt-auto p-[20px] border flex " + styles.socialsContainer
              }
            >
              <div className={"flex items-center " + styles.textSocials}>
                socials
              </div>
              <div className={"mx-auto flex gap-[20px] " + styles.iconSocials}>
                <Link href=" https://discord.gg/k6SPTtYWvY" target="_blank">
                  <img src="socials/discord.svg" alt="discord" />
                </Link>
                <Link href=" https://t.me/+c_94dDhWILNmYWU9" target="_blank">
                  <img src="socials/telegram.svg" alt="telegram" />
                </Link>
                <Link href=" https://twitter.com/DexifierX" target="_blank">
                  <img src="socials/twitter.svg" alt="twitter" />
                </Link>
                <Link href=" https://www.youtube.com/@Dexifier" target="_blank">
                  <img src="socials/youtube.svg" alt="youtube" />
                </Link>
              </div>
            </div>
          </div>
          <div>
            <img className="mx-auto" src="community.png" alt="community" />
          </div>
        </div>
      </Section>
      <Footer />
    </main>
  );
}
