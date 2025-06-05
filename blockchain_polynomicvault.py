from random import randint

def generate_shares(secret_key,k,n):
    '''k out of n shares needed to reconstruct the secret'''
    poly_coeff=[]
    poly_coeff.append(secret_key)
    rand_coeff=0
    for i in range(k-1):
        rand_coeff=randint(1,secret_key)
        poly_coeff.append(rand_coeff)
    shares=[]
    fx=0
    for i in range(1,n+1):
        for j in range(len(poly_coeff)):
            fx+=poly_coeff[j]*(i**j)
        shares.append((i,fx))
        fx=0
    return shares

def secret_reconstruct(shares):
    '''input list of tuple of (x,y) of k shares'''
    secret=0
    for i in range(len(shares)):
        product=1
        for j in range(len(shares)):
            if i!=j:
                product*=(0-shares[j][0])/(shares[i][0]-shares[j][0])
        secret+=product*shares[i][1]
    return secret

y=generate_shares(65,2,4)
print(y)
