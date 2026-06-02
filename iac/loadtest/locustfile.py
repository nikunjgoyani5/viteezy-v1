from locust import HttpUser, task
import json, time
import random, string
from locust.contrib.fasthttp import FastHttpUser

COUPON_CODE = "VITEEZY15"
header = {'Content-Length': 0, 'User-Agent': 'locust' }

class QuickstartUser(FastHttpUser):

    @task
    def on_start(self):
        quiz_external_reference = self.quiz()
        self.blend(quiz_external_reference)

    def quiz(self):
        quiz_external_reference = json.loads(self.client.post("/quiz", headers=header).content)['externalReference']

        with self.client.get("/quiz/" + quiz_external_reference + "/answer/name", catch_response=True) as response:
            if response.status_code == 404:
                response.success()
        self.client.post("/quiz/" + quiz_external_reference + "/answer/name", json={"name": "test"})

        with self.client.get("/quiz/" + quiz_external_reference + "/answer/date-of-birth", catch_response=True) as response:
            if response.status_code == 404:
                response.success()
        self.client.post("/quiz/" + quiz_external_reference + "/answer/date-of-birth", json={"date": "1990-01-01"})

        with self.client.get("/customer/email/quiz/" + quiz_external_reference, catch_response=True) as response:
            if response.status_code == 404:
                response.success()
        self.client.post("/customer/email/quiz/" + quiz_external_reference, json={"email": str(''.join(random.choices(string.ascii_uppercase + string.digits, k=10)) + "@mail.com"), "optIn": "false"})

#         self.quiz_question(quiz_external_reference, "")
#         self.quiz_question(quiz_external_reference, "")
        self.quiz_question(quiz_external_reference, "vitamin-opinion")
        self.quiz_question(quiz_external_reference, "vitamin-intake")
        self.quiz_question(quiz_external_reference, "genders")
        self.quiz_question(quiz_external_reference, "birth-health")
        self.quiz_question(quiz_external_reference, "pregnancy-state")
        self.quiz_question(quiz_external_reference, "help-goal")
        self.quiz_question(quiz_external_reference, "usage-goals")
        self.quiz_question(quiz_external_reference, "trouble-falling-asleep")
        self.quiz_question(quiz_external_reference, "average-sleeping-hours")
        self.quiz_question(quiz_external_reference, "healthy-lifestyle")
        self.quiz_question(quiz_external_reference, "amount-of-fruit-consumption")
        self.quiz_question(quiz_external_reference, "amount-of-vegetable-consumption")
        self.quiz_question(quiz_external_reference, "amount-of-dairy-consumption")
        self.quiz_question(quiz_external_reference, "amount-of-fiber-consumption")

        self.quiz_question(quiz_external_reference, "amount-of-meat-consumption")
        self.quiz_question(quiz_external_reference, "amount-of-fish-consumption")
        self.quiz_question(quiz_external_reference, "daily-six-alcoholic-drinks")
        self.quiz_question(quiz_external_reference, "weekly-twelve-alcoholic-drinks")

        self.quiz_question(quiz_external_reference, "daily-four-coffee")
        self.quiz_question(quiz_external_reference, "allergy-types")
        self.quiz_question(quiz_external_reference, "diet-type")
        self.quiz_question(quiz_external_reference, "diet-intolerances")

        self.quiz_question(quiz_external_reference, "urinary-infection")
        self.quiz_question(quiz_external_reference, "iron-prescribed")
        self.quiz_question(quiz_external_reference, "eastern-medicine-opinion")
        self.quiz_question(quiz_external_reference, "new-product-available")

        self.quiz_question(quiz_external_reference, "attention-focus")
        self.quiz_question(quiz_external_reference, "attention-state")
        self.quiz_question(quiz_external_reference, "menstruation-interval")
        self.quiz_question(quiz_external_reference, "menstruation-mood")
        self.quiz_question(quiz_external_reference, "menstruation-side-issue")
        self.quiz_question(quiz_external_reference, "mental-fitness")
        self.quiz_question(quiz_external_reference, "transition-period-complaints")

        return quiz_external_reference

    def quiz_question(self, quiz_external_reference, question):
        self.client.get("/category/" + question)
        with self.client.get("/quiz/" + quiz_external_reference + "/answer/" + question, catch_response=True) as response:
            if response.status_code == 404:
                response.success()
        self.client.post("/quiz/" + quiz_external_reference + "/answer/" + question + "/1", headers=header)

    def blend(self, quiz_external_reference):
        blend_external_reference = json.loads(self.client.post("/quiz/" + quiz_external_reference + "/blends/v2", headers=header).content)['blendExternalReference']

        # first blend page
        self.default_blend_page(quiz_external_reference, blend_external_reference)

        # second blend page
        self.default_blend_page(quiz_external_reference, blend_external_reference)
        self.client.get("/coupon/" + COUPON_CODE)

        # third blend page
        email = self.default_blend_page(quiz_external_reference, blend_external_reference)
        self.client.get("/coupon/" + COUPON_CODE)
        with self.client.get("/customer/blend/" + blend_external_reference, catch_response=True) as response:
            if response.status_code == 404:
                response.success()

        # pay
        self.client.put("/customer/blend/" + blend_external_reference, json={"firstName": "test", "lastName": "lastName", "phoneNumber": "0600000000", "email": str(email), "street": "street", "houseNumber": 1, "houseNumberAddition": "a", "postcode": "1000AA", "city": "plaats", "country": "NL"})
        time.sleep(1) # sleep 1 seconds
#         self.client.post("/payment/blend/" + blend_external_reference, json={"couponCode": COUPON_CODE, "monthsSubscribed": 1})
        self.client.post("/payment/blend/" + blend_external_reference, json={"monthsSubscribed": 1})

    def default_blend_page(self, quiz_external_reference, blend_external_reference):
        ingredients = json.loads(self.client.get("/blends/" + blend_external_reference + "/ingredients").content)
        for ingredient in ingredients:
            self.client.get("/ingredients/" + str(ingredient['ingredientId']))
        self.client.get("/quiz/" + quiz_external_reference + "/answer/name")
        return json.loads(self.client.get("/customer/email/quiz/" + quiz_external_reference).content)['email']


