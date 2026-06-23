<footer class="footer">
    <div class="footer__content">
        <div class="footer__left">
            <div class="brand">
                <a class="brand__name" href="/">Sifaka.dev</a>
                <div class="brand__slogan">Develop databases — without grunt work</div>
            </div>
            <div class="honestly-thankful">Thank you for taking the precious time to visit :)</div>
        </div>
        <div class="footer__middle">
            <form class="news-form">
                <label 
                    class="news-form__label"
                    for="email"
                >Down for a ~monthly two-way e-mail?</label>
                <div class="news-form__control">
                    <input 
                        id="news-email-input"
                        class="news-form__input"
                        name="email"

                        type="email" 
                        autocomplete="email" 
                        placeholder="pleasesayyes@mail.com"
                    />
                    <button class="news-form__submit">➔</button>
                </div>
            </form>
        </div>
        <div class="footer__right">
            <div class="legal-info">
                <div class="legal-info__links">
                    <a class="legal-info__link" href="/terms-of-use">Terms of Use</a>
                    <a class="legal-info__link" href="/privacy-policy">Privacy Policy</a>
                </div>
                <div class="legal-info__copyright">© 2026 Pieter Groenendijk. All rights reserved.</div>
            </div>
        </div>
    </div>
</footer>


<style>
    .footer {
        background-color: var(--brown);
    }

    .footer__content {
        margin-inline: auto;
        padding-inline: var(--gap-128);
        padding-block: var(--gap-96) var(--gap-128);
        max-width: 1600px;
        display: flex;
        gap: var(--gap-32);
    }

    .footer__content > * {
        flex-shrink: 0;
        flex-grow: 1;
    }


    .footer__left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: var(--gap-64);
    }

    .honestly-thankful {
        color: var(--light);
    }

    .brand__name {
        text-decoration: none;
        font-size: var(--font-size-64);
        font-weight: 600;
        letter-spacing: 0.05ch;
        color: var(--yellow);
    }

    .brand__slogan {
        color: var(--light);
    }


    .footer__middle {
        display: flex;
    }

    .news-form {
        align-self: end;
    }

    .news-form {

    }

    .news-form__label {
        display: block;
        margin-bottom: var(--gap-16);
        font-weight: 500;
        color: var(--light);
    }

    .news-form__control {
        --control-height: clamp(2rem, 1.652rem + 1.739vw, 3rem); /* 32 - 48 */
        --control-border-radius: var(--gap-8);
        display: flex;
        gap: var(--gap-8);
    }

    .news-form__input {
        flex: 1 1 32ch;
        display: block;
        box-sizing: border-box;
        border: 2px solid var(--yellow);
        border-radius: var(--control-border-radius);
        height: var(--control-height);
        padding-inline: var(--gap-16);
        font-size: var(--font-size-16);
        font-weight: 500;
        background-color: var(--brown);
        color: var(--yellow);
    }

    .news-form__input::placeholder {
        font-weight: 400;
        color: var(--yellow);
    }

    .news-form__submit {
        flex: 0 0 auto;
        width: var(--control-height);
        height: var(--control-height);
        border-radius: var(--control-border-radius);
        color: var(--dark);
        background-color: var(--yellow);
    }


    .footer__right {
        display: flex;
    }

    .legal-info {
        align-self: end;
        text-align: right;
    }

    .legal-info__links {
        margin-bottom: var(--gap-8);
        display: flex;
        justify-content: end;
        gap: var(--gap-16);
    }

    .legal-info__link {
        font-size: var(--font-size-14);
        color: var(--light);
    }

    .legal-info__copyright {
        font-size: var(--font-size-14);
        color: var(--light);
    }
</style>