// import { NextRequest, NextResponse } from 'next/server'

// export async function POST(req: NextRequest) {
//   try {
//     const { description } = await req.json()

//     if (!description || typeof description !== 'string' || !description.trim()) {
//       return NextResponse.json(
//         { error: 'Please describe the outfit you want to generate.' },
//         { status: 400 }
//       )
//     }

//     const fashionPrompt = `fashion photography, ${description.trim()}, professional model, studio lighting, high fashion magazine, elegant, detailed clothing, 8k quality, photorealistic`

//     const response = await fetch(
//       'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0',
//       {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           inputs: fashionPrompt,
//           parameters: {
//             negative_prompt: 'ugly, blurry, low quality, distorted, cartoon',
//             num_inference_steps: 30,
//             guidance_scale: 7.5,
//           },
//         }),
//       }
//     )

//     if (!response.ok) {
//       if (response.status === 503) {
//         return NextResponse.json(
//           { error: 'AI model is warming up, please try again in 20 seconds' },
//           { status: 503 }
//         )
//       }
//       throw new Error('Generation failed')
//     }

//     const imageBuffer = await response.arrayBuffer()
//     const base64Image = Buffer.from(imageBuffer).toString('base64')
//     const imageUrl = `data:image/jpeg;base64,${base64Image}`

//     return NextResponse.json({ image: imageUrl })

//   } catch (error) {
//     console.error('Generate outfit error:', error)
//     return NextResponse.json(
//       { error: 'Failed to generate outfit. Please try again.' },
//       { status: 500 }
//     )
//   }
// }

// import { NextRequest, NextResponse } from 'next/server'

// export async function POST(req: NextRequest) {
//   try {
//     const { description } = await req.json()

//     if (!description || typeof description !== 'string' || !description.trim()) {
//       return NextResponse.json(
//         { error: 'Please describe the outfit you want to generate.' },
//         { status: 400 }
//       )
//     }

//     const fashionPrompt = encodeURIComponent(
//       `fashion photography, ${description.trim()}, professional model, studio lighting, high fashion magazine, elegant, detailed clothing, 8k quality, photorealistic`
//     )

//     const imageUrl = `https://image.pollinations.ai/prompt/${fashionPrompt}?width=768&height=1024&nologo=true`

//     return NextResponse.json({ image: imageUrl })

//   } catch (error) {
//     console.error('Generate outfit error:', error)
//     return NextResponse.json(
//       { error: 'Failed to generate outfit. Please try again.' },
//       { status: 500 }
//     )
//   }
// }

// import { NextRequest, NextResponse } from 'next/server'

// export async function POST(req: NextRequest) {
//   try {
//     const { description } = await req.json()

//     if (!description || typeof description !== 'string' || !description.trim()) {
//       return NextResponse.json(
//         { error: 'Please describe the outfit you want to generate.' },
//         { status: 400 }
//       )
//     }

//     const input = description.trim().toLowerCase()

//     // Detect style for illustration
//     let subject = 'elegant female fashion figure'
//     if (input.includes('male') || input.includes('man') || 
//         input.includes('men') || input.includes('groom') ||
//         input.includes('boy') || input.includes('suit') ||
//         input.includes('sherwani') || input.includes('kurta pyjama')) {
//       subject = 'elegant male fashion figure'
//     } else if (input.includes('kid') || input.includes('child') || 
//                input.includes('children') || input.includes('baby')) {
//       subject = 'cute children fashion figure'
//     } else if (input.includes('old') || input.includes('elderly') || 
//                input.includes('senior')) {
//       subject = 'graceful elderly fashion figure'
//     } else if (input.includes('saree') || input.includes('sari') || 
//                input.includes('lehenga') || input.includes('salwar') ||
//                input.includes('dupatta') || input.includes('indian') ||
//                input.includes('traditional') || input.includes('ethnic')) {
//       subject = 'elegant indian fashion figure in traditional pose'
//     }

//     const fashionPrompt = encodeURIComponent(
//       `high fashion illustration, ${description.trim()},
//       ${subject}, haute couture fashion sketch,
//       elegant elongated fashion figure, 
//       Vogue fashion illustration style,
//       watercolor and ink fashion artwork,
//       professional fashion design illustration,
//       detailed fabric texture and draping,
//       soft pastel background, artistic brushstrokes,
//       fashion week runway illustration,
//       by famous fashion illustrators like Mats Gustafson`
//     )

//     const imageUrl = `https://image.pollinations.ai/prompt/${fashionPrompt}?width=768&height=1024&nologo=true&model=flux`

//     return NextResponse.json({ image: imageUrl })

//   } catch (error) {
//     console.error('Generate outfit error:', error)
//     return NextResponse.json(
//       { error: 'Failed to generate outfit. Please try again.' },
//       { status: 500 }
//     )
//   }
// }

import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { description } = await req.json()

    if (!description || typeof description !== 'string' || !description.trim()) {
      return NextResponse.json(
        { error: 'Please describe the outfit you want to generate.' },
        { status: 400 }
      )
    }

    const input = description.trim().toLowerCase()

    // ── DEMOGRAPHIC DETECTION ──
    let demographic = 'A single young adult female model'
    let ageGroup = 'adult'

    if (input.includes('toddler') || input.includes('baby')) {
      demographic = 'A single toddler model aged 1-3 years'
      ageGroup = 'toddler'
    } else if (input.includes('6 year') || input.includes('5 year') ||
               input.includes('7 year') || input.includes('8 year') ||
               input.includes('kid') || input.includes('child') ||
               input.includes('children') || input.includes('girl birthday') ||
               input.includes('boy birthday')) {
      const isGirl = input.includes('girl') || input.includes('frock') ||
                     input.includes('lehenga choli')
      demographic = isGirl
        ? 'A single 6-year-old girl model'
        : 'A single 6-year-old boy model'
      ageGroup = 'child'
    } else if (input.includes('teenager') || input.includes('teen')) {
      demographic = input.includes('boy') || input.includes('men')
        ? 'A single teenage male model aged 15-17'
        : 'A single teenage female model aged 15-17'
      ageGroup = 'teen'
    } else if (input.includes('elderly') || input.includes('old') ||
               input.includes('senior') || input.includes('aged')) {
      demographic = input.includes('man') || input.includes('men') ||
                    input.includes('male')
        ? 'A single elderly senior male model aged 65-70 with silver hair'
        : 'A single elegant elderly senior female model aged 65-70 with silver hair'
      ageGroup = 'elderly'
    } else if (input.includes('couple')) {
      demographic = 'An elderly couple, one senior male and one senior female'
      ageGroup = 'elderly'
    } else if (input.includes('man') || input.includes('men') ||
               input.includes('male') || input.includes('groom') ||
               input.includes('boy') || input.includes('sherwani') ||
               input.includes('dhoti') || input.includes('kurta pajama') ||
               input.includes('nehru') || input.includes('suit') && !input.includes('girl')) {
      demographic = 'A single young adult male model'
      ageGroup = 'adult_male'
    }

    // ── GARMENT DETECTION & EXCLUSIVITY BLOCK ──
    let garmentRule = ''
    let exclusionRule = ''

    if (input.includes('saree') || input.includes('sari')) {
      garmentRule = '5-9 yards of draped fabric elegantly wrapped around the body with a fitted blouse and petticoat visible at the waist, pallu draped over the left shoulder'
      exclusionRule = 'Strictly a saree. Do NOT generate a gown, lehenga, or dress.'
    } else if (input.includes('lehenga')) {
      garmentRule = 'heavily embroidered cropped blouse with a voluminous flared skirt and a sheer dupatta draped elegantly'
      exclusionRule = 'Strictly a lehenga. Do NOT generate a saree, gown, or dress.'
    } else if (input.includes('anarkali')) {
      garmentRule = 'floor-length heavily flared tunic with fitted leggings underneath and a dupatta'
      exclusionRule = 'Strictly an Anarkali suit. Do NOT generate a saree or lehenga.'
    } else if (input.includes('kurti') || input.includes('kurta') && !input.includes('pajama') && !input.includes('dhoti')) {
      garmentRule = 'straight knee-length tunic worn over fitted pants or leggings'
      exclusionRule = 'Strictly a kurti/kurta top. Do NOT generate a full gown or saree.'
    } else if (input.includes('salwar') || input.includes('kameez')) {
      garmentRule = 'long tunic with pleated trousers and dupatta'
      exclusionRule = 'Strictly a salwar kameez. Do NOT generate a saree or lehenga.'
    } else if (input.includes('dhoti') && !input.includes('girl')) {
      garmentRule = 'traditional dhoti with clearly separated leg fabric draped around the waist, paired with a kurta on top'
      exclusionRule = 'Strictly dhoti pants with clear leg separation. Do NOT generate a skirt or dress or gown.'
    } else if (input.includes('sherwani')) {
      garmentRule = 'structured knee-length formal embroidered coat over churidar trousers'
      exclusionRule = 'Strictly a sherwani coat. Do NOT generate a kurta or suit jacket.'
    } else if (input.includes('kurta pajama')) {
      garmentRule = 'long straight tunic top with straight loose trousers'
      exclusionRule = 'Strictly kurta pajama. Do NOT generate a sherwani or dhoti.'
    } else if (input.includes('nehru')) {
      garmentRule = 'sleeveless hip-length tailored structured vest over a formal shirt and trousers'
      exclusionRule = 'Strictly a Nehru jacket vest. Do NOT generate a full jacket or sherwani.'
    } else if (input.includes('frock') || input.includes('a-line')) {
      garmentRule = 'knee-length flared A-line children\'s dress with puffy sleeves'
      exclusionRule = 'Strictly a children\'s frock. Do NOT generate an adult gown.'
    } else if (input.includes('romper')) {
      garmentRule = 'one-piece shorts jumpsuit for toddler'
      exclusionRule = 'Strictly a romper. Do NOT generate a dress or frock.'
    } else if (input.includes('gown')) {
      garmentRule = 'floor-length elegant evening gown with flowing fabric'
      exclusionRule = 'Strictly an evening gown. Do NOT generate a saree or lehenga.'
    } else if (input.includes('hoodie')) {
      garmentRule = 'oversized casual hoodie sweatshirt with relaxed fit'
      exclusionRule = 'Strictly casual streetwear hoodie. Do NOT generate formal wear.'
    } else if (input.includes('suit') && (input.includes('three') || input.includes('formal') || input.includes('navy'))) {
      garmentRule = 'formal three-piece suit with jacket, waistcoat, and trousers with a tie'
      exclusionRule = 'Strictly a formal western suit. Do NOT generate Indian traditional wear.'
    } else if (input.includes('trench coat')) {
      garmentRule = 'long elegant trench coat with wide-leg trousers'
      exclusionRule = 'Strictly a trench coat outfit. Do NOT generate Indian wear.'
    } else if (input.includes('jeans')) {
      garmentRule = 'casual western jeans with a stylish top'
      exclusionRule = 'Strictly casual western wear. Do NOT generate traditional Indian wear.'
    }

    // ── ANATOMICAL QUALITY LOCK (Mandatory) ──
    const anatomicalLock = `The model must feature a beautifully clear, highly detailed, and realistic face with striking expressive eyes, a defined nose, well-shaped lips, and naturally textured hair. Both arms, hands, and fingers must be fully rendered, anatomically accurate, 100% visible, and gracefully posed. Absolutely no missing limbs, mutated hands, or blurred facial smudges.`

    // ── BUILD FINAL PROMPT ──
    const finalPrompt = `
      Professional high-fashion illustration and croquis artwork.
      ${demographic} wearing ${description.trim()}.
      Garment details: ${garmentRule || description.trim()}.
      ${exclusionRule}
      Sharp ink outlines with smooth fabric watercolor washes.
      Clean isolated studio background.
      Vogue and haute couture fashion illustration style.
      Detailed fabric texture, draping, and embroidery clearly visible.
      Full body shot showing complete outfit from head to toe.
      ${anatomicalLock}
      Single isolated subject only. No duplicate figures.
      Award winning fashion illustration quality.
    `

    const encodedPrompt = encodeURIComponent(finalPrompt.trim())
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=768&height=1024&nologo=true&model=flux`

    return NextResponse.json({ image: imageUrl })

  } catch (error) {
    console.error('Generate outfit error:', error)
    return NextResponse.json(
      { error: 'Failed to generate outfit. Please try again.' },
      { status: 500 }
    )
  }
}