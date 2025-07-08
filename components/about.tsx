import { Card, CardContent } from "@/components/ui/card";
import { Award, Heart, Users, Clock } from "lucide-react";
import Image from "next/image";

export default function About() {
  const features = [
    {
      icon: Heart,
      title: "Սիրով պատրաստված",
      description: "Յուրաքանչյուր ուտեստ պատրաստվում է սիրով և ուշադրությամբ"
    },
    {
      icon: Award,
      title: "Բարձրորակ բաղադրիչներ",
      description: "Միայն թարմ և բարձրորակ բաղադրիչներ մեր ուտեստների համար"
    },
    {
      icon: Users,
      title: "Ընտանեկան մթնոլորտ",
      description: "Ջերմ և հյուրասեր մթնոլորտ բոլոր հաճախորդների համար"
    },
    {
      icon: Clock,
      title: "Ավանդական բաղադրատոմսեր",
      description: "Սերունդներով փոխանցված ավանդական հայկական բաղադրատոմսեր"
    }
  ];

  return (
    <section
      id='about'
      className='py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-white'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2
            className='text-3xl lg:text-4xl font-bold text-gray-900 mb-4'
            style={{ fontFamily: "Arial" }}
          >
            <span className='text-[#DC2626]'>ՏԻԳ-ԳՈՌ</span>-ի մասին
          </h2>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Մեր պատմությունը, արժեքները և այն, ինչ մեզ առանձնացնում է
            մյուսներից։ Արի ծանոթանանք :)
          </p>
        </div>

        <div className='grid lg:grid-cols-2 gap-8 items-start mb-16'>
          <div className='space-y-6'>
            <div className='space-y-4'>
              <h3
                className='text-2xl font-bold text-gray-900'
                style={{ fontFamily: "Arial" }}
              >
                Մեր պատմությունը
              </h3>
              <p className='text-gray-600 leading-relaxed'>
                ՏԻԳ-ԳՈՌ ռեստորանը հիմնադրվել է 2015 թվականին՝ նպատակ ունենալով
                բերել ավանդական հայկական խորովածի և շաուրմայի իսկական համը մեր
                հաճախորդներին: Մեր անունը խորհրդանշում է կրակի և համի կատարյալ
                համադրությունը:
              </p>
              <p className='text-gray-600 leading-relaxed'>
                Տարիների ընթացքում մենք դարձել ենք հայտնի մեր բարձրորակ
                սպասարկմամբ, թարմ բաղադրիչներով և ավանդական բաղադրատոմսերով: Մեր
                յուրաքանչյուր ուտեստ պատրաստվում է սիրով և մեծ ուշադրությամբ:
              </p>
            </div>
          </div>

          <div className='relative flex justify-center lg:justify-end'>
            <div className='relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-md'>
              <Image
                src='/restaurant-exterior.jpg'
                alt='ՏԻԳ-ԳՈՌ Restaurant Exterior'
                width={400}
                height={300}
                className='w-full h-full object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent'></div>

              {/* Experience Badge - Bottom Left */}
              <div className='absolute bottom-4 left-4 bg-red-600 p-3 rounded-xl shadow-xl z-10'>
                <div className='text-center'>
                  <div className='text-xl font-bold text-white'>9+</div>
                  <div className='text-xs text-white/90'>Տարի փորձ</div>
                </div>
              </div>

              {/* Customers Badge - Top Right */}
              <div className='absolute top-4 right-4 bg-red-600 p-3 rounded-xl shadow-xl z-10'>
                <div className='text-center'>
                  <div className='text-xl font-bold text-white'>2000+</div>
                  <div className='text-xs text-white/90'>Գոհ հաճախորդ</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {features.map((feature, index) => (
            <Card
              key={index}
              className='text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-md'
            >
              <CardContent className='p-6'>
                <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                  <feature.icon className='w-8 h-8 text-red-600' />
                </div>
                <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 text-sm leading-relaxed'>
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
